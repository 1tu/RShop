import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { ManufactureEntity } from './manufacture.entity';

@Component()
export class ManufactureService extends AServiceBase<ManufactureEntity> {
  constructor( @Inject('ManufactureRepositoryToken') _repository: Repository<ManufactureEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<ManufactureEntity>): Promise<ManufactureEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['product'] });
  }

  get(opts?: FindManyOptions<ManufactureEntity>): Promise<ManufactureEntity[]> {
    return this._repository.find({ ...opts, relations: ['product'] });
  }
}
