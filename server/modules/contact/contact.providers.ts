import { Connection, Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';

export const contactProviders = [
  {
    provide: 'ContactRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ContactEntity),
    inject: ['DbConnectionToken'],
  },
];
