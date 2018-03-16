import { Connection } from 'typeorm';

import { RejectionEntity } from './rejection.entity';

export const rejectionProviders = [
  {
    provide: 'RejectionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(RejectionEntity),
    inject: ['DbConnectionToken'],
  },
];
