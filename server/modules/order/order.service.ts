import { Repository, FindOneOptions, FindManyOptions, RemoveOptions, SaveOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { OrderEntity } from './order.entity';
import { OrderProductEntity } from '../order_product/order_product.entity';

@Component()
export class OrderService extends AServiceBase<OrderEntity> {
  constructor(
    @Inject('OrderRepositoryToken') _repository: Repository<OrderEntity>,
    @Inject('OrderProductRepositoryToken') private _OPrepository: Repository<OrderProductEntity>
  ) { super(_repository); }

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
      .leftJoinAndSelect('product.manufacture', 'manufacture')
      .where('order.id = :id', { id })
      .getOne();
  }

  async put(model: Partial<OrderEntity>, opts?: SaveOptions) {
    let instance = await this._repository.findOneById(model.id);
    this._repository.merge(instance, model);
    return this._repository.save(instance, opts);
  }

  async delete(id: number, opts?: RemoveOptions) {
    const instance = await this._repository.findOneById(id);
    if (instance.productList && instance.productList.length) {
      await this._OPrepository.remove(instance.productList);
    }
    return this._repository.remove(instance, opts);
  }
}
