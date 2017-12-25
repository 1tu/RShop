import { RejectionEntity } from '../../../../server/modules/rejection/rejection.entity';

export interface RejectionStoreState {
  item: RejectionEntity;
  list: RejectionEntity[];
}
