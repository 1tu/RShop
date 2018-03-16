import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { CategoryShopModule } from '../category_shop/category_shop.module';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  modules: [DatabaseModule, CategoryShopModule],
  components: [
    ...categoryProviders,
    CategoryService,
  ],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule { }
