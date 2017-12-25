import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { DatabaseModule } from '../../common/database/database.module';
import { permissionProviders } from './permission.providers';
import { PermissionController } from './permission.controller';
import { PermissionSeeder } from './permission.seeder';
import { config } from '../../config/index';

@Module({
  modules: [DatabaseModule],
  components: [
    ...permissionProviders,
    PermissionService,
    PermissionSeeder
  ],
  controllers: [PermissionController]
})
export class PermissionModule {
  constructor(seeder: PermissionSeeder) {
    if (config.env === 'dev') seeder.seed();
  }
}
