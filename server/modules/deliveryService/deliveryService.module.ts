import { Module } from '@nestjs/common';
import { DeliveryServiceService } from './deliveryService.service';
import { DatabaseModule } from '../../common/database/database.module';
import { deliveryServiceProviders } from './deliveryService.providers';
import { DeliveryServiceController } from './deliveryService.controller';

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
