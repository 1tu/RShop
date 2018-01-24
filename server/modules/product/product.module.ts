import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { DatabaseModule } from '../../common/database/database.module';
import { productProviders } from './product.providers';
import { ProductController } from './product.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...productProviders,
    ProductService,
  ],
  controllers: [ProductController]
})
export class ProductModule { }
