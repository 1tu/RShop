import { createConnection } from 'typeorm';

import { config } from '../../../config';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection(config.db),
  },
];
