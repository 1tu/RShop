import { CommonApi } from './internals/base.api';
import { PaymentServiceEntity } from '../../server/modules/paymentService/paymentService.entity';

class PaymentServiceApi extends CommonApi<PaymentServiceEntity> {

}

export const paymentServiceApi = new PaymentServiceApi('paymentService');
