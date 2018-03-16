import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { UserEntity } from './user.entity';

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
