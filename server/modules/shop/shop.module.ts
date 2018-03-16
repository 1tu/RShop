import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { ShopController } from './shop.controller';
import { shopProviders } from './shop.providers';
import { ShopService } from './shop.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...shopProviders,
    ShopService,
  ],
  controllers: [ShopController],
  exports: [ShopService]
})
export class ShopModule { }
