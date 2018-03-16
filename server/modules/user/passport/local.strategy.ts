import { Component } from '@nestjs/common';
import * as passport from 'passport';
import { Strategy } from 'passport-local';

import { UserEntity } from '../../user/user.entity';
import { UserService } from '../user.service';

@Component()
export class LocalStrategy extends Strategy {
  constructor(private _userService: UserService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, next) => await this.verify(email, password, next)
    );

    passport.serializeUser((user: UserEntity, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
      try {
        done(null, await this._userService.getOneById(id));
      } catch (e) {
        done(e);
      }
    });

    passport.use(this);
  }

  public async verify(email, password, next) {
    try {
      const user = await this._userService.getForAuthCheck(email);
      if (!user || !user.checkPassword(password)) next(null);
      else next(null, user);
    } catch (e) {
      next(e);
    }
  }
}
