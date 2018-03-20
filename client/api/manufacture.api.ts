import axios from 'axios';

import { ManufactureEntity } from '../../server/modules/manufacture/manufacture.entity';
import { ManufactureSchemaOption } from '../../server/modules/manufacture/manufacture.schema';
import { CommonApi } from './internals/base.api';
import { ManufacturePropList } from '../store/modules';

class ManufactureApi extends CommonApi<ManufactureEntity> {
  async getProps(): Promise<ManufacturePropList> {
    return axios.get(`/${this.modelName}/props`).then(res => res.data);
  }
}

export const manufactureApi = new ManufactureApi('manufacture');
