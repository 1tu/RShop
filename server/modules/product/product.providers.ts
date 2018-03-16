import { Connection } from 'typeorm';

import { ProductEntity } from './product.entity';

export const productProviders = [
  {
    provide: 'ProductRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ProductEntity),
    inject: ['DbConnectionToken'],
  },
];
