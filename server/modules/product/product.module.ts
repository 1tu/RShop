import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...productProviders,
    ProductService,
  ],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule { }
