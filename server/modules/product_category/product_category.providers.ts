import { Connection } from 'typeorm';

import { ProductCategoryEntity } from './product_category.entity';

export const productCategoryProviders = [
  {
    provide: 'ProductCategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ProductCategoryEntity),
    inject: ['DbConnectionToken'],
  },
];
