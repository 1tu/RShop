import { Module } from '@nestjs/common';

import { ApiModule } from '../../modules/api/api.module';
import { CategoryModule } from '../../modules/category/category.module';
import { CityModule } from '../../modules/city/city.module';
import { ContactModule } from '../../modules/contact/contact.module';
import { CustomerModule } from '../../modules/customer/customer.module';
import { DeliveryModule } from '../../modules/delivery/delivery.module';
import { DeliveryServiceModule } from '../../modules/deliveryService/deliveryService.module';
import { ImageModule } from '../../modules/image/image.module';
import { ManufactureModule } from '../../modules/manufacture/manufacture.module';
import { OrderModule } from '../../modules/order/order.module';
import { PaymentModule } from '../../modules/payment/payment.module';
import { PaymentServiceModule } from '../../modules/paymentService/paymentService.module';
import { PermissionModule } from '../../modules/permission/permission.module';
import { PreManufactureModule } from '../../modules/preManufacture/preManufacture.module';
import { ProductModule } from '../../modules/product/product.module';
import { RejectionModule } from '../../modules/rejection/rejection.module';
import { RemindModule } from '../../modules/remind/remind.module';
import { RoleModule } from '../../modules/role/role.module';
import { SeoMetaModule } from '../../modules/seoMeta/seoMeta.module';
import { SeoTemplateModule } from '../../modules/seoTemplate/seoTemplate.module';
import { ShopModule } from '../../modules/shop/shop.module';
import { UserModule } from '../../modules/user/user.module';
import { GatewayModule } from '../gateway/gateway.module';
import { AppController } from './app.controller';
import { FilteredPageModule } from '../../modules/filteredPage/filteredPage.module';

@Module({
  modules: [
    GatewayModule,
    // очередь инициализации важна для seeder'а
    PermissionModule, CityModule, ImageModule, DeliveryServiceModule, RejectionModule, SeoTemplateModule, SeoMetaModule, // no deps
    RoleModule, UserModule, PaymentServiceModule, DeliveryModule, ManufactureModule, // one deps
    ContactModule, RemindModule, PaymentModule, CustomerModule,
    ShopModule, CategoryModule, ProductModule, PreManufactureModule, FilteredPageModule,
    OrderModule,

    ApiModule,
  ],
  controllers: [AppController]
})
export class ApplicationModule { }
