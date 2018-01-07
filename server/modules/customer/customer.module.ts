import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from '../../common/database/database.module';
import { customerProviders } from './customer.providers';
import { CustomerController } from './customer.controller';
import { config } from '../../config/index';
import { DatabaseSeeder } from '../../common/database/database.seeder';

@Module({
  modules: [DatabaseModule],
  components: [
    ...customerProviders,
    CustomerService,
  ],
  controllers: [CustomerController]
})
export class CustomerModule {
  constructor(service: CustomerService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
