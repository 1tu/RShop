import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../common/database/database.module';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { LocalStrategy } from './passport/local.strategy';
import * as passport from 'passport';
import { UserEntity } from './user.entity';

@Module({
  modules: [DatabaseModule],
  components: [
    ...userProviders,
    UserService,
    LocalStrategy
  ],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('local', { failureRedirect: '/login' }))
      .forRoutes({ path: '/user/login', method: RequestMethod.POST });
  }
}
