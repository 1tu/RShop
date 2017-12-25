import { CommonApi } from './internals/base.api';
import { UserEntity } from '../../server/modules/user/user.entity';

class UserApi extends CommonApi<UserEntity> {

}

export const userApi = new UserApi('user');
