import { Connection } from 'typeorm';

import { ManufactureEntity } from './manufacture.entity';

export const manufactureProviders = [
  {
    provide: 'ManufactureRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ManufactureEntity),
    inject: ['DbConnectionToken'],
  },
];
