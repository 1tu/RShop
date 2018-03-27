import { Component, Inject } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository, SaveOptions } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { PreManufactureEntity } from './preManufacture.entity';

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

  async getByCategoryIds(ids: number[], shopId: number) {
    if (!shopId) return [];
    const res = await this._repository
      .createQueryBuilder('preManufacture')
      .leftJoinAndSelect('preManufacture.manufacture', 'manufacture')
      .leftJoin('manufacture.product', 'product')
      .leftJoin('product.categoryList', 'pCategoryList')
      .leftJoinAndSelect('pCategoryList.category', 'pCategory', `pCategory.id IN (${ids.join(',')})`)
      .leftJoin('preManufacture.categoryList', 'categoryList')
      .leftJoinAndSelect('categoryList.category', 'category', `category.id IN (${ids.join(',')})`)
      .where('product.shop.id = :shopId', { shopId })
      .getMany();

    return res.filter(p => p.categoryList.length || p.manufacture.product.categoryList.length);
  }
}
