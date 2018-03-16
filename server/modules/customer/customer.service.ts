import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { CustomerEntity } from './customer.entity';

@Component()
export class CustomerService extends AServiceBase<CustomerEntity> {
  constructor( @Inject('CustomerRepositoryToken') _repository: Repository<CustomerEntity>) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<CustomerEntity>): Promise<CustomerEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['city', 'photo'] });
  }
}
