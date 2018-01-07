import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { DatabaseModule } from '../../common/database/database.module';
import { cityProviders } from './city.providers';
import { CityController } from './city.controller';
import { config } from '../../config/index';
import { DatabaseSeeder } from '../../common/database/database.seeder';

@Module({
  modules: [DatabaseModule],
  components: [
    ...cityProviders,
    CityService,
  ],
  controllers: [CityController]
})
export class CityModule {
  constructor(service: CityService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
