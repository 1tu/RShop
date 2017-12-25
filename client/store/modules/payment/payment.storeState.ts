import { PaymentEntity } from '../../../../server/modules/payment/payment.entity';

export interface PaymentStoreState {
  item: PaymentEntity;
  list: PaymentEntity[];
}
