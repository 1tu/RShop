import { Connection } from 'typeorm';

import { SeoTemplateEntity } from './seoTemplate.entity';

export const seoTemplateProviders = [
  {
    provide: 'SeoTemplateRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(SeoTemplateEntity),
    inject: ['DbConnectionToken'],
  },
];
