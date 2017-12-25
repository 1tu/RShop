import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../common/database/database.module';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { UserSeeder } from './user.seeder';
import { config } from '../../config/index';

@Module({
  modules: [DatabaseModule],
  components: [
    ...userProviders,
    UserService,
    UserSeeder
  ],
  controllers: [UserController]
})
export class UserModule {
  constructor(seeder: UserSeeder) {
    if (config.env === 'dev') seeder.seed();
  }
}
