import { DeliveryEntity } from '../../../../server/modules/delivery/delivery.entity';

export interface DeliveryStoreState {
  item: DeliveryEntity;
  list: DeliveryEntity[];
}
