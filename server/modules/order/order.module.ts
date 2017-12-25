import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DatabaseModule } from '../../common/database/database.module';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...orderProviders,
    OrderService,
  ],
  controllers: [OrderController]
})
export class OrderModule { }
