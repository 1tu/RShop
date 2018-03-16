import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { GatewayModule } from '../../common/gateway/gateway.module';
import { OrderProductModule } from '../order_product/order_product.module';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { OrderService } from './order.service';

@Module({
  modules: [DatabaseModule, OrderProductModule, GatewayModule],
  components: [
    ...orderProviders,
    OrderService,
  ],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule { }
