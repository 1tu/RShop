import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { RoleEntity } from './role.entity';

@Component()
export class RoleService extends AServiceBase<RoleEntity> {
  constructor( @Inject('RoleRepositoryToken') _repository: Repository<RoleEntity>) {
    super(_repository);
  }
}
