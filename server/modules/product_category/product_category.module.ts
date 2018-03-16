import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { productCategoryProviders } from './product_category.providers';

@Module({
  modules: [DatabaseModule],
  components: [
    ...productCategoryProviders,
  ],
  exports: [...productCategoryProviders]
})
export class ProductCategoryModule { }
