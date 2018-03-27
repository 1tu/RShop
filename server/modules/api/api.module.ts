import { Module } from '@nestjs/common';

import { GatewayModule } from '../../common/gateway/gateway.module';
import { CategoryModule } from '../category/category.module';
import { CityModule } from '../city/city.module';
import { CustomerModule } from '../customer/customer.module';
import { DeliveryServiceModule } from '../deliveryService/deliveryService.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { ShopModule } from '../shop/shop.module';
import { ApiController } from './api.controller';
import { ManufactureModule } from '../manufacture/manufacture.module';
import { FilteredPageModule } from '../filteredPage/filteredPage.module';
import { PreManufactureModule } from '../preManufacture/preManufacture.module';

@Module({
  imports: [
    OrderModule,
    ProductModule,
    ManufactureModule,
    PreManufactureModule,
    CityModule,
    CustomerModule,
    GatewayModule,
    DeliveryServiceModule,
    CategoryModule,
    FilteredPageModule,
    ShopModule
  ],
  controllers: [ApiController]
})
export class ApiModule {}
