import { Connection } from 'typeorm';

import { SeoMetaEntity } from './seoMeta.entity';

export const seoMetaProviders = [
  {
    provide: 'SeoMetaRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(SeoMetaEntity),
    inject: ['DbConnectionToken'],
  },
];
