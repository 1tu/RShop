import { OrderEntity } from '../../../../server/modules/order/order.entity';

export interface OrderStoreState {
  item: OrderEntity;
  list: OrderEntity[];
}
