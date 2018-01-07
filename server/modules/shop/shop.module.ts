import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { DatabaseModule } from '../../common/database/database.module';
import { shopProviders } from './shop.providers';
import { ShopController } from './shop.controller';
import { config } from '../../config/index';
import { DatabaseSeeder } from '../../common/database/database.seeder';

@Module({
  modules: [DatabaseModule],
  components: [
    ...shopProviders,
    ShopService,
  ],
  controllers: [ShopController]
})
export class ShopModule {
  constructor(service: ShopService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
