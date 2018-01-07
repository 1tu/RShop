import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { DatabaseModule } from '../../common/database/database.module';
import { productProviders } from './product.providers';
import { ProductController } from './product.controller';
import { DatabaseSeeder } from '../../common/database/database.seeder';
import { config } from '../../config/index';

@Module({
  modules: [DatabaseModule],
  components: [
    ...productProviders,
    ProductService,
  ],
  controllers: [ProductController]
})
export class ProductModule {
  constructor(service: ProductService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
