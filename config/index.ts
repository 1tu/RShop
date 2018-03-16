import { ConnectionOptions } from 'typeorm';

import dev from './development';
import prod from './production';
import test from './test';

export class Config {
  env: 'dev' | 'test' | 'prod';
  server: { protocol: 'http' | 'https', host: string, port: number };
  auth: { secret: string, expires: number };
  db: ConnectionOptions;
  api: { token: string };
}

let cfg: Config;
switch (process.env.NODE_ENV || 'dev') {
  case 'dev':
  case 'development':
    cfg = dev;
    break;
  case 'test':
  case 'testing':
    cfg = test;
    break;
  case 'prod':
  case 'production':
    cfg = prod;
    break;
}

export const config = cfg;
