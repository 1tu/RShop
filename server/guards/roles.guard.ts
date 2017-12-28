import { Guard, CanActivate, ExecutionContext, ReflectMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const GUARD_NAME = 'Roles';

export const Roles = (...roles: string[]) => ReflectMetadata(GUARD_NAME, roles);

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  public canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const roles = this.reflector.get<string[]>(GUARD_NAME, handler);
    if (!roles) {
      return true;
    }

    const user = req.user;
    return user && user.roles && this._hasRole(user, roles);
  }

  private _hasRole(user: any, roles: string[]): boolean {
    return !!user.roles.find((role) => !!roles.find((item) => item === role));
  }
}
