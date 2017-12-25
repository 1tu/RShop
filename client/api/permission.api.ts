import { CommonApi } from './internals/base.api';
import { PermissionEntity } from '../../server/modules/permission/permission.entity';

class PermissionApi extends CommonApi<PermissionEntity> {

}

export const permissionApi = new PermissionApi('permission');
