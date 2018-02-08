import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';
import { CityModule } from '../city/city.module';
import { GatewayModule } from '../../common/gateway/gateway.module';
import { DeliveryServiceModule } from '../deliveryService/deliveryService.module';

@Module({
  imports: [OrderModule, ProductModule, CityModule, CustomerModule, GatewayModule, DeliveryServiceModule],
  controllers: [ApiController]
})
export class ApiModule { }
