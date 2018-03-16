import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { PaymentController } from './payment.controller';
import { paymentProviders } from './payment.providers';
import { PaymentService } from './payment.service';

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
