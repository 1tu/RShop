import { Guard, CanActivate } from '@nestjs/common';

@Guard()
export class AuthGuard implements CanActivate {
  canActivate(req): boolean {
    return !!req.user;
  }
}
