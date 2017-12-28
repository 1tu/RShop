import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { Component, Inject } from '@nestjs/common';
import { config } from './../../../config/index';
import { Request } from 'express';
import { UserEntity } from '../../user/user.entity';
import { UserService } from '../user.service';

@Component()
export class LocalStrategy extends Strategy {
  constructor(private _userService: UserService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, next) => await this.verify(req, email, password, next)
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

  public async verify(req: Request, email, password, next) {
    try {
      const user = await this._userService.getOne({ where: { email } });
      if (!this._userService.checkPassword(user, password)) next(null);
      else next(null, user);
    } catch (e) {
      next(e);
    }
  }
}
