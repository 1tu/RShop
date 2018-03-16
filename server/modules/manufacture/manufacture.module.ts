import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { ManufactureController } from './manufacture.controller';
import { manufactureProviders } from './manufacture.providers';
import { ManufactureService } from './manufacture.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...manufactureProviders,
    ManufactureService,
  ],
  controllers: [ManufactureController],
  exports: [ManufactureService]
})
export class ManufactureModule { }
