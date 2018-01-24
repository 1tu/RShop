import * as path from 'path';
import { Config } from './index';

const config: Config = {
  env: 'prod',
  server: {
    port: 3003,
  },
  auth: {
    secret: 'secret', expires: 60 * 60
  },
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'developer',
    password: '1q2w3e4r',
    database: 'rshop_dev',
    synchronize: true,
    entities: [
      path.join(__dirname, '/../modules/**/*.entity.ts'),
    ],
    cli: {
      migrationsDir: path.join(__dirname, '/../migrations'),
    }
  },
  api: {
    token: 'b875aba36dc5d56bb32354cd864b1ddcdf52b3fa3eb135cb4a87ca4207d740770f73302e58155f97c441d95a070442a323ab398639ea276358f83602e55d8229'
  }
};

export default config;
