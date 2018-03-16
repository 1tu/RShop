import { CityEntity } from '../../server/modules/city/city.entity';
import { CommonApi } from './internals/base.api';

class CityApi extends CommonApi<CityEntity> {

}

export const cityApi = new CityApi('city');
