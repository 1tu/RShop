import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { SeoTemplateEntity } from './seoTemplate.entity';

@Component()
export class SeoTemplateService extends AServiceBase<SeoTemplateEntity> {
  constructor( @Inject('SeoTemplateRepositoryToken') _repository: Repository<SeoTemplateEntity>) {
    super(_repository);
  }
}
