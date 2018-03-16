import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { PaymentServiceController } from './paymentService.controller';
import { paymentServiceProviders } from './paymentService.providers';
import { PaymentServiceService } from './paymentService.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...paymentServiceProviders,
    PaymentServiceService,
  ],
  controllers: [PaymentServiceController],
  exports: [PaymentServiceService]
})
export class PaymentServiceModule { }
