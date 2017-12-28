import { Guard, CanActivate, ExecutionContext, ReflectMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const GUARD_NAME = 'Permissions';

export const Permissions = (...permissions: string[]) => ReflectMetadata(GUARD_NAME, permissions);

@Guard()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  public canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const permissions = this.reflector.get<string[]>(GUARD_NAME, handler);
    if (!permissions) {
      return true;
    }

    const user = req.user;
    return user && user.permissions && this._hasPermission(user, permissions);
  }

  private _hasPermission(user: any, permissions: string[]): boolean {
    return !!user.permissions.find((permission) => !!permissions.find((item) => item === permission));
  }
}
