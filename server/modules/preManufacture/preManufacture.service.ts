import { Component, Inject } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository, SaveOptions } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { PreManufactureEntity } from './preManufacture.entity';
import { PropKeyValue } from '../api/api.controller';

@Component()
export class PreManufactureService extends AServiceBase<PreManufactureEntity> {
  constructor(@Inject('PreManufactureRepositoryToken') _repository: Repository<PreManufactureEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<PreManufactureEntity>): Promise<PreManufactureEntity> {
    return this._repository
      .createQueryBuilder('preManufacture')
      .leftJoinAndSelect('preManufacture.categoryList', 'categoryList')
      .leftJoinAndSelect('categoryList.category', 'category')
      .leftJoinAndSelect('preManufacture.manufacture', 'manufacture')
      .leftJoinAndSelect('manufacture.product', 'product')
      .leftJoinAndSelect('preManufacture.seoMeta', 'seoMeta')
      .leftJoinAndSelect('preManufacture.seoTemplate', 'seoTemplate')
      .leftJoinAndSelect('preManufacture.imageList', 'imageList')
      .where('preManufacture.id = :id', { id })
      .getOne();
    // return this._repository.findOneById(id, { relations: ['shop', 'manufacture'], ...opts });
  }

  async put(model: Partial<PreManufactureEntity>, opts?: SaveOptions) {
    let instance = await this._repository.findOneById(model.id);
    this._repository.merge(instance, model);
    // cascade update fix
    model.categoryList.forEach((item, index) => {
      instance.categoryList[index].isMain = model.categoryList[index].isMain;
      if (item.id) return;
      instance.categoryList[index].id = undefined;
    });
    return this._repository.save(instance, opts);
  }

  async getByFilter(categoryIds: number[], propKeyValueList: PropKeyValue[], shopId: number) {
    const propKeys = propKeyValueList.map(p => ({ key: p.key, value: p.valueList[0] }));
    if (!shopId) return [];
    let res: any = this._repository
      .createQueryBuilder('preManufacture')
      .leftJoinAndSelect('preManufacture.manufacture', 'manufacture')
      .leftJoin('manufacture.product', 'product');

    if (categoryIds.length) {
      res = res
        .leftJoin('product.categoryList', 'pCategoryList')
        .leftJoinAndSelect('pCategoryList.category', 'pCategory', `pCategory.id IN (${categoryIds.join(',')})`)
        .leftJoin('preManufacture.categoryList', 'categoryList')
        .leftJoinAndSelect('categoryList.category', 'category', `category.id IN (${categoryIds.join(',')})`);
    }

    res = await res
      .where('product.shop.id = :shopId', { shopId })
      .andWhere(`config @> '${JSON.stringify(propKeys)}'`)
      .getMany();
    const z = `config @> '${JSON.stringify(propKeys)}'`;
    return categoryIds.length ? res.filter(p => p.categoryList.length || p.manufacture.product.categoryList.length) : res;
  }
}
