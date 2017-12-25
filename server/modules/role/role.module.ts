import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { DatabaseModule } from '../../common/database/database.module';
import { roleProviders } from './role.providers';
import { RoleController } from './role.controller';
import { RoleSeeder } from './role.seeder';
import { config } from '../../config/index';

@Module({
  modules: [DatabaseModule],
  components: [
    ...roleProviders,
    RoleService,
    RoleSeeder
  ],
  controllers: [RoleController]
})
export class RoleModule {
  constructor(seeder: RoleSeeder) {
    if (config.env === 'dev') seeder.seed();
  }
}
