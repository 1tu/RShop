import { Connection, Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

export const orderProviders = [
  {
    provide: 'OrderRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(OrderEntity),
    inject: ['DbConnectionToken'],
  },
];
