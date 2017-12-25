import { Connection, Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';

export const paymentProviders = [
  {
    provide: 'PaymentRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaymentEntity),
    inject: ['DbConnectionToken'],
  },
];
