import { CanActivate, ExecutionContext, Guard, ReflectMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from '../modules/user/user.entity';

const GUARD_NAME = 'Permissions';

export const Permissions = (...permissions: string[]) => ReflectMetadata(GUARD_NAME, permissions);

@Guard()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  public canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const acceptedPermissionList = this.reflector.get<string[]>(GUARD_NAME, handler);
    if (!acceptedPermissionList) {
      return true;
    }

    const user: UserEntity = req.user;
    return user && this._hasPermission(user, acceptedPermissionList);
  }

  private _hasPermission(user: UserEntity, acceptedPermissionList: string[]): boolean {
    return !!user.role.permissionList.find(permission =>
      !!acceptedPermissionList.find(item => item === permission.name)
    );
  }
}
