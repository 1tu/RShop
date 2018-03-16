import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { SeoTemplateController } from './seoTemplate.controller';
import { seoTemplateProviders } from './seoTemplate.providers';
import { SeoTemplateService } from './seoTemplate.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...seoTemplateProviders,
    SeoTemplateService,
  ],
  controllers: [SeoTemplateController],
  exports: [SeoTemplateService]
})
export class SeoTemplateModule { }
