import { CommonApi } from './internals/base.api';
import { UserEntity } from '../../server/modules/user/user.entity';
import axios from 'axios';

class UserApi extends CommonApi<UserEntity> {
  async getOwn(): Promise<UserEntity> {
    return axios.get(`/${this.modelName}/own`).then(res => res.data);
  }
}

export const userApi = new UserApi('user');
