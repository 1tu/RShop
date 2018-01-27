import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { DatabaseModule } from '../../common/database/database.module';
import { paymentProviders } from './payment.providers';
import { PaymentController } from './payment.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...paymentProviders,
    PaymentService,
  ],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule { }
