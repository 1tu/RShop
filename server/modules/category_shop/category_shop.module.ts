import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { categoryShopProviders } from './category_shop.providers';

@Module({
  modules: [DatabaseModule],
  components: [
    ...categoryShopProviders,
  ],
  exports: [...categoryShopProviders]
})
export class CategoryShopModule { }
