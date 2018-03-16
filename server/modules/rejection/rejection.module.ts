import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { RejectionController } from './rejection.controller';
import { rejectionProviders } from './rejection.providers';
import { RejectionService } from './rejection.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...rejectionProviders,
    RejectionService,
  ],
  controllers: [RejectionController],
  exports: [RejectionService]
})
export class RejectionModule { }
