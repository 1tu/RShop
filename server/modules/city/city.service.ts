import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { CityEntity } from './city.entity';

@Component()
export class CityService extends AServiceBase<CityEntity> {
  constructor( @Inject('CityRepositoryToken') _repository: Repository<CityEntity>) {
    super(_repository);
  }
}
