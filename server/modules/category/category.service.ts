import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, RemoveOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { CategoryShopEntity } from '../category_shop/category_shop.entity';
import { CategoryEntity } from './category.entity';
import { flatten } from 'lodash';

@Component()
export class CategoryService extends AServiceBase<CategoryEntity> {
  constructor(
    @Inject('CategoryRepositoryToken') _repository: Repository<CategoryEntity>,
    @Inject('CategoryShopRepositoryToken') private _SPrepository: Repository<CategoryShopEntity>
  ) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<CategoryEntity>): Promise<CategoryEntity> {
    return this._repository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryParent', 'categoryParent')
      .leftJoinAndSelect('category.seoList', 'seoList')
      .leftJoinAndSelect('seoList.shop', 'shop')
      .leftJoinAndSelect('seoList.seoTemplate', 'seoTemplate')
      .leftJoinAndSelect('seoList.seoMeta', 'seoMeta')
      .where('category.id = :id', { id })
      .getOne();
    // return this._repository.findOneById(id, { relations: ['categoryParent', 'seoList'], ...opts });
  }

  getOneByNameTranslit(name: string): Promise<CategoryEntity> {
    return this._repository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.seoList', 'seoList')
      .leftJoinAndSelect('seoList.seoTemplate', 'seoTemplate')
      .leftJoinAndSelect('seoList.seoMeta', 'seoMeta')
      .where('category.nameTranslit = :name', { name })
      .getOne();
  }

  async delete(id: number, opts?: RemoveOptions) {
    const instance = await this._repository.findOneById(id);
    if (instance.seoList && instance.seoList.length) {
      await this._SPrepository.remove(instance.seoList);
    }
    return this._repository.remove(instance, opts);
  }

  getByIds(ids: number[]) {
    return this._repository.findByIds(ids);
  }

  async getListBaseByShop(shopId: number) {
    const res = await this._repository
      .createQueryBuilder('category')
      .where('category.isBase = :isBase', { isBase: true })
      .leftJoin('category.productList', 'productList')
      .leftJoinAndSelect('productList.product', 'product', 'product.shop.id = :shopId', { shopId })
      .select(['category.id', 'category.name', 'category.nameTranslit', 'category.isBase', 'product.id'])
      .getMany();

    return res.filter(item => {
      const res = item.productList.length;
      item.productList = undefined;
      return res;
    });
  }

  async getListChildByBase(categoryId: number, shopId: number) {
    let res = await this._getListChildById(categoryId, shopId);
    let lastList = res;
    while (true) {
      const temp = flatten(await Promise.all(lastList.map(c => this._getListChildById(c.id, shopId))));
      if (!temp.length) break;
      res = res.concat(temp);
      lastList = temp;
    }
    return res;
  }

  private async _getListChildById(categoryId: number, shopId: number) {
    const res = await this._repository
      .createQueryBuilder('category')
      .where('category.categoryParent.id = :categoryId', { categoryId })
      .leftJoin('category.productList', 'productList')
      .leftJoinAndSelect('productList.product', 'product', 'product.shop.id = :shopId', { shopId })
      .leftJoin('category.preManufactureList', 'preManufactureList')
      .leftJoinAndSelect('preManufactureList.preManufacture', 'preManufacture')
      .leftJoinAndSelect('preManufacture.manufacture', 'manufacture')
      .leftJoinAndSelect('manufacture.product', 'mProduct', 'mProduct.shop.id = :shopId', { shopId })
      .select(['category.id', 'category.name', 'category.nameTranslit', 'product.id', 'mProduct.id'])
      .getMany();

    return res.filter(item => {
      const res = item.productList.length || item.preManufactureList.length;
      item.productList = undefined;
      item.preManufactureList = undefined;
      return res;
    });
  }
}
