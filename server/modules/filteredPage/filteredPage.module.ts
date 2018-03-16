import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { FilteredPageController } from './filteredPage.controller';
import { filteredPageProviders } from './filteredPage.providers';
import { FilteredPageService } from './filteredPage.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...filteredPageProviders,
    FilteredPageService,
  ],
  controllers: [FilteredPageController],
  exports: [FilteredPageService]
})
export class FilteredPageModule { }
