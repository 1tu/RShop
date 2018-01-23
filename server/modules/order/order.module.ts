import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DatabaseModule } from '../../common/database/database.module';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';
import { OrderProductModule } from '../order_product/order_product.module';

@Module({
  modules: [DatabaseModule, OrderProductModule],
  components: [
    ...orderProviders,
    OrderService,
  ],
  controllers: [OrderController]
})
export class OrderModule { }
