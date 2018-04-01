import axios from 'axios';

import { CategoryEntity } from '../../server/modules/category/category.entity';
import { CommonApi } from './internals/base.api';

class CategoryApi extends CommonApi<CategoryEntity> {
  async getListByBase(id: number, shopId: number): Promise<CategoryEntity[]> {
    return axios.get(`/${this.modelName}/byBase/${id}`, { params: { shopId } }).then(res => res.data);
  }
}

export const categoryApi = new CategoryApi('category');
