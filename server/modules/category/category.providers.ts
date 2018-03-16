import { Connection } from 'typeorm';

import { CategoryEntity } from './category.entity';

export const categoryProviders = [
  {
    provide: 'CategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CategoryEntity),
    inject: ['DbConnectionToken'],
  },
];
