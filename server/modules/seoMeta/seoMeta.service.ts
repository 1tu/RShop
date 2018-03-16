import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { SeoMetaEntity } from './seoMeta.entity';

@Component()
export class SeoMetaService extends AServiceBase<SeoMetaEntity> {
  constructor( @Inject('SeoMetaRepositoryToken') _repository: Repository<SeoMetaEntity>) {
    super(_repository);
  }
}
