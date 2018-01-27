import { Module } from '@nestjs/common';
import { PaymentServiceService } from './paymentService.service';
import { DatabaseModule } from '../../common/database/database.module';
import { paymentServiceProviders } from './paymentService.providers';
import { PaymentServiceController } from './paymentService.controller';

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
