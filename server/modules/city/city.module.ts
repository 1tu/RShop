import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { DatabaseModule } from '../../common/database/database.module';
import { cityProviders } from './city.providers';
import { CityController } from './city.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...cityProviders,
    CityService,
  ],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule { }
