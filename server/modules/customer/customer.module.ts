import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { CustomerService } from './customer.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...customerProviders,
    CustomerService,
  ],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule { }
