import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { orderProductProviders } from './order_product.providers';

@Module({
  modules: [DatabaseModule],
  components: [
    ...orderProductProviders,
  ],
  exports: [...orderProductProviders]
})
export class OrderProductModule { }
