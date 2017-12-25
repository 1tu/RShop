import dev from './development';
import test from './test';
import prod from './production';
import { ConnectionOptions } from 'typeorm';

export class Config {
  env: 'dev' | 'test' | 'prod';
  auth: { secret: string, expires: number };
  server: { port: number };
  db: ConnectionOptions;
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
