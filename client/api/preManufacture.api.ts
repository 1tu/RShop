import { CommonApi } from './internals/base.api';
import { PreManufactureEntity } from '../../server/modules/preManufacture/preManufacture.entity';

class PreManufactureApi extends CommonApi<PreManufactureEntity> {

}

export const preManufactureApi = new PreManufactureApi('preManufacture');
