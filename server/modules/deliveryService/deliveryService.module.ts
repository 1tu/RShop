import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { DeliveryServiceController } from './deliveryService.controller';
import { deliveryServiceProviders } from './deliveryService.providers';
import { DeliveryServiceService } from './deliveryService.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...deliveryServiceProviders,
    DeliveryServiceService,
  ],
  controllers: [DeliveryServiceController],
  exports: [DeliveryServiceService]
})
export class DeliveryServiceModule { }
