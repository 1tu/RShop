import { Component, Inject } from '@nestjs/common';
import { flatten, groupBy, transform, uniqBy } from 'lodash';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { ManufactureEntity } from './manufacture.entity';
import { ManufactureSchemaTypes } from './manufacture.schema';

@Component()
export class ManufactureService extends AServiceBase<ManufactureEntity> {
  constructor(@Inject('ManufactureRepositoryToken') _repository: Repository<ManufactureEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<ManufactureEntity>): Promise<ManufactureEntity> {
    return this._repository.findOneById(id, { relations: ['product'], ...opts });
  }

  get(opts?: FindManyOptions<ManufactureEntity>): Promise<ManufactureEntity[]> {
    return this._repository.find({ relations: ['product'], ...opts });
  }

  async getProps(ids?: number[]) {
    const res = ids ? await this._repository.findByIds(ids) : await this._repository.find();
    return transform(
      groupBy(flatten(res.map(m => m.schema)).filter(s => s.type !== ManufactureSchemaTypes.SELECT_IMAGE), 'key'),
      (acc, value, key) => {
        const propList = uniqBy(flatten(value.map(v => v.optionList)).filter(v => v.value), 'value');
        if (propList.length) acc.push({ key: value[0].key, name: value[0].name, options: propList });
      },
      []
    );
  }
}
