import { UserEntity } from '../../../../server/modules/user/user.entity';

export interface UserStoreState {
  item: UserEntity;
  list: UserEntity[];
}
