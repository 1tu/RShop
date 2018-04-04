import { Connection, createConnection } from 'typeorm';

import { config } from '../../../config';

let connection: Connection;

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      if (!connection) {
        connection = await createConnection(config.db);
      }
      return connection;
    }
  }
];
