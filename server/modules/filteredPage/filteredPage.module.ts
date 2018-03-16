import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { CategoryModule } from '../category/category.module';
import { FilteredPageController } from './filteredPage.controller';
import { filteredPageProviders } from './filteredPage.providers';
import { FilteredPageService } from './filteredPage.service';

@Module({
  modules: [DatabaseModule, CategoryModule],
  components: [
    ...filteredPageProviders,
    FilteredPageService,
  ],
  controllers: [FilteredPageController],
  exports: [FilteredPageService]
})
export class FilteredPageModule { }
