import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { CustomerEntity } from './customer.entity';

@Component()
export class CustomerService extends AServiceBase<CustomerEntity> {
  constructor( @Inject('CustomerRepositoryToken') _repository: Repository<CustomerEntity>) {
    super(_repository);
  }
}
