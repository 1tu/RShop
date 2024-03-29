import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, RemoveOptions, Repository, SaveOptions } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { OrderProductEntity } from '../order_product/order_product.entity';
import { OrderEntity } from './order.entity';

@Component()
export class OrderService extends AServiceBase<OrderEntity> {
  constructor(
    @Inject('OrderRepositoryToken') _repository: Repository<OrderEntity>,
    @Inject('OrderProductRepositoryToken') private _OPrepository: Repository<OrderProductEntity>
  ) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<OrderEntity>): Promise<OrderEntity> {
    return this._repository.findOneById(id, { relations: ['shop', 'paymentList', 'rejection', 'delivery'], ...opts });
  }

  async put(model: Partial<OrderEntity>, opts?: SaveOptions) {
    let instance = await this._repository.findOneById(model.id);
    this._repository.merge(instance, model);
    // cascade update fix
    model.productList.forEach((item, index) => {
      if (item.id) return;
      instance.productList[index].id = undefined;
    });
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
