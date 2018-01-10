import { Repository, FindOneOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { PaymentServiceEntity } from './paymentService.entity';

@Component()
export class PaymentServiceService extends AServiceBase<PaymentServiceEntity> {
  constructor( @Inject('PaymentServiceRepositoryToken') _repository: Repository<PaymentServiceEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<PaymentServiceEntity>): Promise<PaymentServiceEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['deliveryService'] });
  }
}
