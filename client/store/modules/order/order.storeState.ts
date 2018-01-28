import { OrderEntity } from '../../../../server/modules/order/order.entity';
import { Notify } from '../../../../shared/types/Notify.types';

export interface OrderStoreState {
  item: OrderEntity;
  list: OrderEntity[];
  // TODO: сделать более информативные уведомления
  // notifyList: Notify[];
  notifyCount: number;
}
