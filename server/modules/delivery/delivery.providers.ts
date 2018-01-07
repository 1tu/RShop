import { Connection, Repository } from 'typeorm';
import { DeliveryEntity } from './delivery.entity';

export const deliveryProviders = [
  {
    provide: 'DeliveryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(DeliveryEntity),
    inject: ['DbConnectionToken'],
  },
];
