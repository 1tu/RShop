import { Module } from '@nestjs/common';
import { OrderProductService } from './orderProduct.service';
import { DatabaseModule } from '../../common/database/database.module';
import { orderProductProviders } from './orderProduct.providers';
import { OrderProductController } from './orderProduct.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...orderProductProviders,
    OrderProductService,
  ],
  controllers: [OrderProductController]
})
export class OrderProductModule { }
