import { CommonApi } from './internals/base.api';
import { CategoryEntity } from '../../server/modules/category/category.entity';

class CategoryApi extends CommonApi<CategoryEntity> {

}

export const categoryApi = new CategoryApi('category');
