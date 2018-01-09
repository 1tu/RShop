import { CommonApi } from './internals/base.api';
import { DeliveryEntity } from '../../server/modules/delivery/delivery.entity';

class DeliveryApi extends CommonApi<DeliveryEntity> {

}

export const deliveryApi = new DeliveryApi('delivery');
