import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { RemindController } from './remind.controller';
import { remindProviders } from './remind.providers';
import { RemindService } from './remind.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...remindProviders,
    RemindService,
  ],
  controllers: [RemindController],
  exports: [RemindService]
})
export class RemindModule { }
