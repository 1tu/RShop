import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, Repository, SaveOptions } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { CategoryService } from '../category/category.service';
import { FilteredPageEntity } from './filteredPage.entity';
import { FilteredPageFilters } from './filteredPage.filters';

@Component()
export class FilteredPageService extends AServiceBase<FilteredPageEntity> {
  constructor(@Inject('FilteredPageRepositoryToken') _repository: Repository<FilteredPageEntity>, private _categoryService: CategoryService) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<FilteredPageEntity>): Promise<FilteredPageEntity> {
    return this._repository.findOneById(id, { relations: ['shop'], ...opts });
  }

  async post(model: Partial<FilteredPageEntity>, opts?: SaveOptions) {
    model.url = await this._makeUrl(model.filters);
    const instance = this._repository.create(model);
    return this._repository.save(instance, opts);
  }

  async put(model: Partial<FilteredPageEntity>, opts?: SaveOptions) {
    model.url = await this._makeUrl(model.filters);
    let instance = await this._repository.findOneById(model.id);
    this._repository.merge(instance, model);
    return this._repository.save(instance, opts);
  }

  private async _makeUrl(filters: FilteredPageFilters) {
    const res = await this._categoryService.getByIds(filters.categoryIdList);
    return '/' + res.map(c => c.nameTranslit).join(',') + ';' + filters.propertyKeyValueList.map(kv => `${kv.key}=${kv.valueList.join('+')}`).join(',');
  }

  async getByCategory(categoryId: number) {
    const res = await this._repository
      .createQueryBuilder('filteredPage')
      .where(`filters -> 'categoryIdList' @> '${categoryId}'`)
      .select(['filteredPage.url', 'filteredPage.name', 'filteredPage.filters'])
      .getMany();
    return res;
  }
}
