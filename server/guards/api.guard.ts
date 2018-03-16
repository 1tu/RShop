import { CanActivate, Guard } from '@nestjs/common';

import { config } from '../../config';

@Guard()
export class ApiGuard implements CanActivate {
  canActivate(req): boolean {
    return config.api.token === req.query.token;
  }
}
