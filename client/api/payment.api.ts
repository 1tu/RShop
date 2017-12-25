import { CommonApi } from './internals/base.api';
import { PaymentEntity } from '../../server/modules/payment/payment.entity';

class PaymentApi extends CommonApi<PaymentEntity> {

}

export const paymentApi = new PaymentApi('payment');
