import { DeliveryServiceEntity } from '../../../../server/modules/deliveryService/deliveryService.entity';

export interface DeliveryServiceStoreState {
  item: DeliveryServiceEntity;
  list: DeliveryServiceEntity[];
}
