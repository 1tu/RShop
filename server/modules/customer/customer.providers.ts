import { Connection, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';

export const customerProviders = [
  {
    provide: 'CustomerRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CustomerEntity),
    inject: ['DbConnectionToken'],
  },
];
