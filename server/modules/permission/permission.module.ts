import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { DatabaseModule } from '../../common/database/database.module';
import { permissionProviders } from './permission.providers';
import { PermissionController } from './permission.controller';

@Module({
  modules: [DatabaseModule],
  components: [
    ...permissionProviders,
    PermissionService,
  ],
  controllers: [PermissionController],
  exports: [PermissionService]
})
export class PermissionModule { }
