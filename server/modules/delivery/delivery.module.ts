import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DatabaseModule } from '../../common/database/database.module';
import { deliveryProviders } from './delivery.providers';
import { DeliveryController } from './delivery.controller';

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
