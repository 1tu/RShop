import { UserEntity } from '../../../../server/modules/user/user.entity';

export interface AuthStoreState {
  isAuthenticated: boolean;
  user: UserEntity;
}
