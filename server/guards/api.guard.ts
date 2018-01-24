import { Guard, CanActivate } from '@nestjs/common';
import { config } from '../config/index';


@Guard()
export class ApiGuard implements CanActivate {
  canActivate(req): boolean {
    return config.api.token === req.query.token;
  }
}
