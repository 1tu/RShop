import { Repository, FindOneOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { DeliveryServiceEntity } from './deliveryService.entity';

@Component()
export class DeliveryServiceService extends AServiceBase<DeliveryServiceEntity> {
  constructor( @Inject('DeliveryServiceRepositoryToken') _repository: Repository<DeliveryServiceEntity>) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<DeliveryServiceEntity>): Promise<DeliveryServiceEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['cityList'] });
  }
}
