import { Connection } from 'typeorm';

import { CategoryShopEntity } from './category_shop.entity';

export const categoryShopProviders = [
  {
    provide: 'CategoryShopRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CategoryShopEntity),
    inject: ['DbConnectionToken'],
  },
];
