import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { RejectionEntity } from './rejection.entity';

@Component()
export class RejectionService extends AServiceBase<RejectionEntity> {
  constructor( @Inject('RejectionRepositoryToken') _repository: Repository<RejectionEntity>) {
    super(_repository);
  }
}
