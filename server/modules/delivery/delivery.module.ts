import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { DeliveryController } from './delivery.controller';
import { deliveryProviders } from './delivery.providers';
import { DeliveryService } from './delivery.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...deliveryProviders,
    DeliveryService,
  ],
  controllers: [DeliveryController],
  exports: [DeliveryService]
})
export class DeliveryModule { }
