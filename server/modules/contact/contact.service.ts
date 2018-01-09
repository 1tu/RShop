import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { ContactEntity } from './contact.entity';

@Component()
export class ContactService extends AServiceBase<ContactEntity> {
  constructor( @Inject('ContactRepositoryToken') _repository: Repository<ContactEntity>) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<ContactEntity>): Promise<ContactEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['customer'] });
  }

  getOne(opts: FindOneOptions<ContactEntity>): Promise<ContactEntity> {
    return this._repository.findOne({ ...opts, relations: ['customer'] });
  }

  get(opts?: FindManyOptions<ContactEntity>): Promise<ContactEntity[]> {
    return this._repository.find({ ...opts, relations: ['customer'] });
  }
}
