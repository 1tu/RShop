import { Module } from '@nestjs/common';

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
import { OrderProductModule } from '../../modules/order_product/orderProduct.module';
import { PaymentModule } from '../../modules/payment/payment.module';
import { PaymentServiceModule } from '../../modules/paymentService/paymentService.module';
import { ProductModule } from '../../modules/product/product.module';
import { RejectionModule } from '../../modules/rejection/rejection.module';
import { RemindModule } from '../../modules/remind/remind.module';
import { ShopModule } from '../../modules/shop/shop.module';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  modules: [
    CityModule, ContactModule, CustomerModule, DeliveryServiceModule, ImageModule, OrderModule, OrderProductModule, PaymentModule,
    PaymentServiceModule, PermissionModule, ProductModule, RejectionModule, RemindModule, RoleModule, ShopModule, UserModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class ApplicationModule { }
