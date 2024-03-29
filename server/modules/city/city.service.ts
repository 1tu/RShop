import { Repository, FindOneOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { CityEntity } from './city.entity';

@Component()
export class CityService extends AServiceBase<CityEntity> {
  constructor(@Inject('CityRepositoryToken') _repository: Repository<CityEntity>) {
    super(_repository);
  }

  getOne(opts?: FindOneOptions<CityEntity>): Promise<CityEntity> {
    return this._repository.findOne(opts);
  }
}
