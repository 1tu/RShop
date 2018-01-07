import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { DatabaseModule } from '../../common/database/database.module';
import { roleProviders } from './role.providers';
import { RoleController } from './role.controller';
import { config } from '../../config/index';
import { DatabaseSeeder } from '../../common/database/database.seeder';

@Module({
  modules: [DatabaseModule],
  components: [
    ...roleProviders,
    RoleService,
  ],
  controllers: [RoleController]
})
export class RoleModule {
  constructor(service: RoleService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
