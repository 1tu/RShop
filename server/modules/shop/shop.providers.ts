import { Connection } from 'typeorm';

import { ShopEntity } from './shop.entity';

export const shopProviders = [
  {
    provide: 'ShopRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ShopEntity),
    inject: ['DbConnectionToken'],
  },
];
