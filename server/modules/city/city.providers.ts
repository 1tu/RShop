import { Connection, Repository } from 'typeorm';
import { CityEntity } from './city.entity';

export const cityProviders = [
  {
    provide: 'CityRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CityEntity),
    inject: ['DbConnectionToken'],
  },
];
