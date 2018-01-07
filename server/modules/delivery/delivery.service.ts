import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { DeliveryEntity } from './delivery.entity';

@Component()
export class DeliveryService extends AServiceBase<DeliveryEntity> {
  constructor( @Inject('DeliveryRepositoryToken') _repository: Repository<DeliveryEntity>) {
    super(_repository);
  }
}
