import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { DatabaseModule } from '../../common/database/database.module';
import { permissionProviders } from './permission.providers';
import { PermissionController } from './permission.controller';
import { config } from '../../config/index';
import { DatabaseSeeder } from '../../common/database/database.seeder';

@Module({
  modules: [DatabaseModule],
  components: [
    ...permissionProviders,
    PermissionService,
  ],
  controllers: [PermissionController]
})
export class PermissionModule {
  constructor(service: PermissionService) {
    if (config.env === 'dev') new DatabaseSeeder(service, this.constructor.name.replace('Module', ''));
  }
}
