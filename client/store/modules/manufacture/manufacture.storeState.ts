import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';

export interface ManufactureStoreState {
  item: ManufactureEntity;
  list: ManufactureEntity[];
}
