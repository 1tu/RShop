import { PaymentServiceEntity } from '../../../../server/modules/paymentService/paymentService.entity';

export interface PaymentServiceStoreState {
  item: PaymentServiceEntity;
  list: PaymentServiceEntity[];
}
