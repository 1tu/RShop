import dev from './development';
import test from './test';
import prod from './production';
import { ConnectionOptions } from 'typeorm';

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
