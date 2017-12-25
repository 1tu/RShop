import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { PaymentEntity } from './payment.entity';

@Component()
export class PaymentService extends AServiceBase<PaymentEntity> {
  constructor( @Inject('PaymentRepositoryToken') _repository: Repository<PaymentEntity>) {
    super(_repository);
  }
}
