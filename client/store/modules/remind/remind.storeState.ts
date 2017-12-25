import { RemindEntity } from '../../../../server/modules/remind/remind.entity';

export interface RemindStoreState {
  item: RemindEntity;
  list: RemindEntity[];
}
