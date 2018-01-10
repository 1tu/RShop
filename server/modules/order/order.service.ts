import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { OrderEntity } from './order.entity';

@Component()
export class OrderService extends AServiceBase<OrderEntity> {
  constructor( @Inject('OrderRepositoryToken') _repository: Repository<OrderEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<OrderEntity>): Promise<OrderEntity> {
    // TODO: return to this when {EAGER: true} will load relations cascade (e => e1 => e2)
    // return this._repository.findOneById(id, { ...opts, relations: ['shop', 'paymentList',  'rejection', 'delivery'] });
    return this._repository.createQueryBuilder('order')
      .leftJoinAndSelect('order.shop', 'shop')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.rejection', 'rejection')
      .leftJoinAndSelect('order.delivery', 'delivery')
      .leftJoinAndSelect('order.paymentList', 'payment')
      .leftJoinAndSelect('order.productList', 'order_product')
      .leftJoinAndSelect('order_product.product', 'product')
      .where('order.id = :id', { id })
      .getOne();
  }
}
