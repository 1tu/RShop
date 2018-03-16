import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { PermissionController } from './permission.controller';
import { permissionProviders } from './permission.providers';
import { PermissionService } from './permission.service';

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
