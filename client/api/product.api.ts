import { CommonApi } from './internals/base.api';
import { ProductEntity } from '../../server/modules/product/product.entity';

class ProductApi extends CommonApi<ProductEntity> {

}

export const productApi = new ProductApi('product');
