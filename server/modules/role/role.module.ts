import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common/database/database.module';
import { RoleController } from './role.controller';
import { roleProviders } from './role.providers';
import { RoleService } from './role.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...roleProviders,
    RoleService,
  ],
  controllers: [RoleController]
})
export class RoleModule { }
