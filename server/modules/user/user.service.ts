import { Repository, SaveOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto';

@Component()
export class UserService extends AServiceBase<UserEntity> {
  constructor( @Inject('UserRepositoryToken') _repository: Repository<UserEntity>) {
    super(_repository);
  }

  getForAuthCheck(email: string) {
    return this._repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.salt', 'user.password'])
      .where('user.email = :email', { email })
      .getOne();
  }

}
