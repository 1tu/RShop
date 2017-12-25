import { Module } from '@nestjs/common';
import { RejectionService } from './rejection.service';
import { DatabaseModule } from '../../common/database/database.module';
import { rejectionProviders } from './rejection.providers';
import { RejectionController } from './rejection.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...rejectionProviders,
    RejectionService,
  ],
  controllers: [RejectionController]
})
export class RejectionModule { }
