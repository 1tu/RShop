import { Module } from '@nestjs/common';
import { GatewayModule } from '../gateway/gateway.module';

import { ImageModule } from '../../modules/image/image.module';
import { PermissionModule } from '../../modules/permission/permission.module';
import { CustomerModule } from '../../modules/customer/customer.module';
import { RoleModule } from '../../modules/role/role.module';
import { UserModule } from '../../modules/user/user.module';
import { AppController } from './app.controller';
import { CityModule } from '../../modules/city/city.module';
import { ContactModule } from '../../modules/contact/contact.module';
import { DeliveryServiceModule } from '../../modules/deliveryService/deliveryService.module';
import { OrderModule } from '../../modules/order/order.module';
import { PaymentModule } from '../../modules/payment/payment.module';
import { PaymentServiceModule } from '../../modules/paymentService/paymentService.module';
import { ProductModule } from '../../modules/product/product.module';
import { RejectionModule } from '../../modules/rejection/rejection.module';
import { RemindModule } from '../../modules/remind/remind.module';
import { ShopModule } from '../../modules/shop/shop.module';
import { DeliveryModule } from '../../modules/delivery/delivery.module';
import { ManufactureModule } from '../../modules/manufacture/manufacture.module';
import { ApiModule } from '../../modules/api/api.module';

@Module({
  modules: [
    GatewayModule,
    // очередь инициализации важна для seeder'а
    PermissionModule, CityModule, ImageModule, DeliveryServiceModule, RejectionModule, // no deps
    RoleModule, UserModule, PaymentServiceModule, DeliveryModule, ManufactureModule, // one deps
    ContactModule, RemindModule, PaymentModule, CustomerModule,
    ShopModule, ProductModule,
    OrderModule,

    ApiModule,
  ],
  controllers: [AppController]
})
export class ApplicationModule { }
