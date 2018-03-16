import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { FilteredPageEntity } from './filteredPage.entity';

@Component()
export class FilteredPageService extends AServiceBase<FilteredPageEntity> {
  constructor( @Inject('FilteredPageRepositoryToken') _repository: Repository<FilteredPageEntity>) {
    super(_repository);
  }
}
