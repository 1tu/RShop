import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as passport from 'passport';

import { DatabaseModule } from '../../common/database/database.module';
import { LocalStrategy } from './passport/local.strategy';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  modules: [DatabaseModule],
  components: [
    ...userProviders,
    UserService,
    LocalStrategy
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('local', { failureRedirect: '/login' }))
      .forRoutes({ path: '/user/login', method: RequestMethod.POST });
  }
}
