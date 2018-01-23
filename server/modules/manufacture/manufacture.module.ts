import { Module } from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { DatabaseModule } from '../../common/database/database.module';
import { manufactureProviders } from './manufacture.providers';
import { ManufactureController } from './manufacture.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...manufactureProviders,
    ManufactureService,
  ],
  controllers: [ManufactureController]
})
export class ManufactureModule { }
