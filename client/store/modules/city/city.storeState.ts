import { CityEntity } from '../../../../server/modules/city/city.entity';

export interface CityStoreState {
  item: CityEntity;
  list: CityEntity[];
}
