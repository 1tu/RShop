import { Connection } from 'typeorm';

import { RemindEntity } from './remind.entity';

export const remindProviders = [
  {
    provide: 'RemindRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(RemindEntity),
    inject: ['DbConnectionToken'],
  },
];
