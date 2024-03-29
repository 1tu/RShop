import * as path from 'path';

import { Config } from '.';

const config: Config = {
  env: 'dev',
  server: {
    protocol: 'http',
    host: 'localhost',
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
      path.join(__dirname, '../server/modules/**/*.entity.ts'),
    ],
    cli: {
      migrationsDir: path.join(__dirname, '../server/migrations'),
    }
  },
  api: {
    token: 'testapi'
  }
};

export default config;
