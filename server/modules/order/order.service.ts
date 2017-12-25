import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { OrderEntity } from './order.entity';

@Component()
export class OrderService extends AServiceBase<OrderEntity> {
  constructor( @Inject('OrderRepositoryToken') _repository: Repository<OrderEntity>) {
    super(_repository);
  }
}
