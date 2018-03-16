import { Connection } from 'typeorm';

import { DeliveryServiceEntity } from './deliveryService.entity';

export const deliveryServiceProviders = [
  {
    provide: 'DeliveryServiceRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(DeliveryServiceEntity),
    inject: ['DbConnectionToken'],
  },
];
