import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { OrderProductEntity } from './orderProduct.entity';
import { AServiceBase } from '../../common/service/base.service';

@Component()
export class OrderProductService extends AServiceBase<OrderProductEntity> {
  constructor( @Inject('OrderProductRepositoryToken') _repository: Repository<OrderProductEntity>) {
    super(_repository);
  }
}
