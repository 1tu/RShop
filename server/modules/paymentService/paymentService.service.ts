import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { PaymentServiceEntity } from './paymentService.entity';

@Component()
export class PaymentServiceService extends AServiceBase<PaymentServiceEntity> {
  constructor( @Inject('PaymentServiceRepositoryToken') _repository: Repository<PaymentServiceEntity>) {
    super(_repository);
  }
}
