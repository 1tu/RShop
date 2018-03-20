import { ManufactureEntity } from '../../../../server/modules/manufacture/manufacture.entity';
import { ManufactureSchemaOption } from '../../../../server/modules/manufacture/manufacture.schema';

export interface ManufacturePropList {
  [key: string]: ManufactureSchemaOption[];
}

export interface ManufactureStoreState {
  item: ManufactureEntity;
  list: ManufactureEntity[];
  propList: ManufacturePropList;
}
