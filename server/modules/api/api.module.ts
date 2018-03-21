import { Module } from '@nestjs/common';

import { GatewayModule } from '../../common/gateway/gateway.module';
import { CategoryModule } from '../category/category.module';
import { CityModule } from '../city/city.module';
import { CustomerModule } from '../customer/customer.module';
import { DeliveryServiceModule } from '../deliveryService/deliveryService.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { ApiController } from './api.controller';

@Module({
  imports: [OrderModule, ProductModule, CityModule, CustomerModule, GatewayModule, DeliveryServiceModule, CategoryModule],
  controllers: [ApiController]
})
export class ApiModule {}
