import { ShopEntity } from '../../../../server/modules/shop/shop.entity';

export interface ShopStoreState {
  item: ShopEntity;
  list: ShopEntity[];
}
