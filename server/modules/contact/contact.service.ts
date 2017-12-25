import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { ContactEntity } from './contact.entity';

@Component()
export class ContactService extends AServiceBase<ContactEntity> {
  constructor( @Inject('ContactRepositoryToken') _repository: Repository<ContactEntity>) {
    super(_repository);
  }
}
