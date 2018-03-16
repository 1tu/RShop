import { PreManufactureEntity } from '../../../../server/modules/preManufacture/preManufacture.entity';

export interface PreManufactureStoreState {
  item: PreManufactureEntity;
  list: PreManufactureEntity[];
}
