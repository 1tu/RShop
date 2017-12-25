import { Connection, Repository } from 'typeorm';
import { OrderProductEntity } from './orderProduct.entity';

export const orderProductProviders = [
  {
    provide: 'OrderProductRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(OrderProductEntity),
    inject: ['DbConnectionToken'],
  },
];
