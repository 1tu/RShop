import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { PaymentEntity } from './payment.entity';

@Component()
export class PaymentService extends AServiceBase<PaymentEntity> {
  constructor(@Inject('PaymentRepositoryToken') _repository: Repository<PaymentEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<PaymentEntity>): Promise<PaymentEntity> {
    return this._repository.findOneById(id, { relations: ['order'], ...opts });
  }
}
