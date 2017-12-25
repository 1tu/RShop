import { Connection, Repository } from 'typeorm';
import { PaymentServiceEntity } from './paymentService.entity';

export const paymentServiceProviders = [
  {
    provide: 'PaymentServiceRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaymentServiceEntity),
    inject: ['DbConnectionToken'],
  },
];
