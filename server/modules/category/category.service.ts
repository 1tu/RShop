import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, RemoveOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { CategoryShopEntity } from '../category_shop/category_shop.entity';
import { CategoryEntity } from './category.entity';

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
    // return this._repository.findOneById(id, { ...opts, relations: ['categoryParent', 'seoList'] });
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
}
