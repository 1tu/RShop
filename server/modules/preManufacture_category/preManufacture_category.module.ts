import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { preManufactureCategoryProviders } from './preManufacture_category.providers';

@Module({
  modules: [DatabaseModule],
  components: [
    ...preManufactureCategoryProviders,
  ],
  exports: [...preManufactureCategoryProviders]
})
export class PreManufactureCategoryModule { }
