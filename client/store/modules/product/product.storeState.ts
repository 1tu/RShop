import { ProductEntity } from '../../../../server/modules/product/product.entity';

export interface ProductStoreState {
  item: ProductEntity;
  list: ProductEntity[];
}
