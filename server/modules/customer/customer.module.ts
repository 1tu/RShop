import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from '../../common/database/database.module';
import { customerProviders } from './customer.providers';
import { CustomerController } from './customer.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...customerProviders,
    CustomerService,
  ],
  controllers: [CustomerController]
})
export class CustomerModule { }
