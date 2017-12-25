import { CommonApi } from './internals/base.api';
import { ShopEntity } from '../../server/modules/shop/shop.entity';

class ShopApi extends CommonApi<ShopEntity> {

}

export const shopApi = new ShopApi('shop');
