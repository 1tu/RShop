import { Connection } from 'typeorm';

import { FilteredPageEntity } from './filteredPage.entity';

export const filteredPageProviders = [
  {
    provide: 'FilteredPageRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(FilteredPageEntity),
    inject: ['DbConnectionToken'],
  },
];
