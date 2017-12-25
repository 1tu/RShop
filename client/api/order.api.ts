import { CommonApi } from './internals/base.api';
import { OrderEntity } from '../../server/modules/order/order.entity';

class OrderApi extends CommonApi<OrderEntity> {

}

export const orderApi = new OrderApi('order');
