import { CommonApi } from './internals/base.api';
import { ManufactureEntity } from '../../server/modules/manufacture/manufacture.entity';

class ManufactureApi extends CommonApi<ManufactureEntity> {

}

export const manufactureApi = new ManufactureApi('manufacture');
