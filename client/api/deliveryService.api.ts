import { CommonApi } from './internals/base.api';
import { DeliveryServiceEntity } from '../../server/modules/deliveryService/deliveryService.entity';

class DeliveryServiceApi extends CommonApi<DeliveryServiceEntity> {

}

export const deliveryServiceApi = new DeliveryServiceApi('deliveryService');
