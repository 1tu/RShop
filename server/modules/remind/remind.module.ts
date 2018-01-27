import { Module } from '@nestjs/common';
import { RemindService } from './remind.service';
import { DatabaseModule } from '../../common/database/database.module';
import { remindProviders } from './remind.providers';
import { RemindController } from './remind.controller';

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
