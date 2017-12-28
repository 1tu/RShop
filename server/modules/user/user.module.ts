import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../common/database/database.module';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { UserSeeder } from './user.seeder';
import { config } from '../../config/index';
import { LocalStrategy } from './passport/local.strategy';
import * as passport from 'passport';

@Module({
  modules: [DatabaseModule],
  components: [
    ...userProviders,
    UserService,
    UserSeeder,
    LocalStrategy
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule implements NestModule {
  constructor(seeder: UserSeeder) {
    if (config.env === 'dev') seeder.seed();
  }

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('local', { failureRedirect: '/login' }))
      .forRoutes({ path: '/user/login', method: RequestMethod.POST });
  }
}
