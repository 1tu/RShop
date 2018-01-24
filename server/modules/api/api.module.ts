import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [ApiController]
})
export class ApiModule { }
