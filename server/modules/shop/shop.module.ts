import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { DatabaseModule } from '../../common/database/database.module';
import { shopProviders } from './shop.providers';
import { ShopController } from './shop.controller';

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
