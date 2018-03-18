import { Connection } from 'typeorm';

import { PreManufactureCategoryEntity } from './preManufacture_category.entity';

export const preManufactureCategoryProviders = [
  {
    provide: 'PreManufactureCategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PreManufactureCategoryEntity),
    inject: ['DbConnectionToken'],
  },
];
