import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { PreManufactureController } from './preManufacture.controller';
import { preManufactureProviders } from './preManufacture.providers';
import { PreManufactureService } from './preManufacture.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...preManufactureProviders,
    PreManufactureService,
  ],
  controllers: [PreManufactureController],
  exports: [PreManufactureService]
})
export class PreManufactureModule { }
