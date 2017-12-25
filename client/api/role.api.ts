import { CommonApi } from './internals/base.api';
import { RoleEntity } from '../../server/modules/role/role.entity';

class RoleApi extends CommonApi<RoleEntity> {

}

export const roleApi = new RoleApi('role');
