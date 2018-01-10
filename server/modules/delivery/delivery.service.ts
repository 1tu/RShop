import { Repository, FindOneOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { DeliveryEntity } from './delivery.entity';

@Component()
export class DeliveryService extends AServiceBase<DeliveryEntity> {
  constructor( @Inject('DeliveryRepositoryToken') _repository: Repository<DeliveryEntity>) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<DeliveryEntity>): Promise<DeliveryEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['city'] });
  }
}
