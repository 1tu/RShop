import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { SeoMetaController } from './seoMeta.controller';
import { seoMetaProviders } from './seoMeta.providers';
import { SeoMetaService } from './seoMeta.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...seoMetaProviders,
    SeoMetaService,
  ],
  controllers: [SeoMetaController],
  exports: [SeoMetaService]
})
export class SeoMetaModule { }
