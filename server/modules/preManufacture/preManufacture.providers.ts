import { Connection } from 'typeorm';

import { PreManufactureEntity } from './preManufacture.entity';

export const preManufactureProviders = [
  {
    provide: 'PreManufactureRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PreManufactureEntity),
    inject: ['DbConnectionToken'],
  },
];
