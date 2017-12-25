import { CommonApi } from './internals/base.api';
import { CityEntity } from '../../server/modules/city/city.entity';

class CityApi extends CommonApi<CityEntity> {

}

export const cityApi = new CityApi('city');
