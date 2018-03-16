import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { RemindEntity } from './remind.entity';

@Component()
export class RemindService extends AServiceBase<RemindEntity> {
  constructor( @Inject('RemindRepositoryToken') _repository: Repository<RemindEntity>) {
    super(_repository);
  }
}
