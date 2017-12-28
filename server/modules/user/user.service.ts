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

  // async post(model: Partial<UserEntity> | Partial<UserEntity>[], opts?: SaveOptions) {
  //   return this._repository.insert(model, opts);
  // }

  checkPassword(user: UserEntity, password: string) {
    if (!password) return false;
    const hashedPass = crypto.pbkdf2Sync(password, user.salt, 10000, 128, 'sha512').toString('base64');
    console.log(hashedPass, '=', user.password);
    return hashedPass === user.password;
  }
}
