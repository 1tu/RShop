import { Module } from '@nestjs/common';
import { DeliveryServiceService } from './deliveryService.service';
import { DatabaseModule } from '../../common/database/database.module';
import { deliveryServiceProviders } from './deliveryService.providers';
import { DeliveryServiceController } from './deliveryService.controller';
import { DatabaseSeeder } from '../../common/database/database.seeder';
import { config } from '../../config/index';

@Module({
  modules: [DatabaseModule],
  components: [
    ...deliveryServiceProviders,
    DeliveryServiceService,
  ],
  controllers: [DeliveryServiceController]
})
export class DeliveryServiceModule {
  constructor(service: DeliveryServiceService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
