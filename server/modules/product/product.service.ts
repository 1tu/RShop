import { Component, Inject } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { ProductEntity } from './product.entity';

@Component()
export class ProductService extends AServiceBase<ProductEntity> {
  constructor(@Inject('ProductRepositoryToken') _repository: Repository<ProductEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
    return this._repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.manufacture', 'manufacture')
      .leftJoinAndSelect('product.imageList', 'imageList')
      .leftJoinAndSelect('product.shop', 'shop')
      .leftJoinAndSelect('product.seoMeta', 'seoMeta')
      .leftJoinAndSelect('product.seoTemplate', 'seoTemplate')
      .leftJoinAndSelect('product.categoryList', 'categoryList')
      .leftJoinAndSelect('categoryList.category', 'category')
      .where('product.id = :id', { id })
      .getOne();
    // return this._repository.findOneById(id, { relations: ['shop', 'seoMeta', 'seoTemplate', 'categoryList'], ...opts });
  }

  getOneByNameTranslit(nameTranslit: string): Promise<ProductEntity> {
    return this._repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.manufacture', 'manufacture')
      .leftJoinAndSelect('product.imageList', 'imageList')
      .leftJoinAndSelect('product.shop', 'shop')
      .leftJoinAndSelect('product.seoMeta', 'seoMeta')
      .leftJoinAndSelect('product.seoTemplate', 'seoTemplate')
      .leftJoinAndSelect('product.categoryList', 'categoryList')
      .leftJoinAndSelect('categoryList.category', 'category')
      .where('product.nameTranslit = :nameTranslit', { nameTranslit })
      .getOne();
    // return this._repository.findOneById(id, { relations: ['shop', 'seoMeta', 'seoTemplate', 'categoryList'], ...opts });
  }

  async getManufactureIdsByCategoryIds(ids: number[], shopId: number) {
    if (!shopId) return [];
    const res = await this._repository
      .createQueryBuilder('product')
      .leftJoin('product.manufacture', 'manufacture')
      .leftJoin('product.categoryList', 'categoryList')
      .leftJoin('categoryList.category', 'category', `category.id IN (${ids.join(',')})`)
      .select(['product.id', 'manufacture.id', 'category.id'])
      .where('product.shop.id = :shopId', { shopId })
      .getMany();

    return res.filter(p => p.categoryList.length);
  }

  async getByFilter(categoryIds: number[], propKeyValueList: any[], shopId: number) {
    if (!shopId) return [];
    let res: any = this._repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.manufacture', 'manufacture')
      .leftJoinAndSelect('product.imageList', 'imageList');

    if (categoryIds.length) {
      res = res
        .leftJoin('product.categoryList', 'categoryList')
        .leftJoinAndSelect('categoryList.category', 'category', `category.id IN (${categoryIds.join(',')})`);
    }

    res = await res
      .where('product.shop.id = :shopId', { shopId })
      .andWhere('manufacture.id IS NULL')
      .getMany();

    return categoryIds.length ? res.filter(p => p.categoryList.length) : res;
  }
}
