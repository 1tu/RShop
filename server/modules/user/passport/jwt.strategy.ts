// import * as passport from 'passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Component, Inject } from '@nestjs/common';
// import { AuthService } from './../auth.service';
// import { config } from './../../../config/index';

// @Component()
// export class JwtStrategy extends Strategy {
//   constructor(private readonly authService: AuthService) {
//     super(
//       {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         passReqToCallback: true,
//         secretOrKey: config.auth.secret,
//       },
//       async (req, payload, next) => await this.verify(req, payload, next)
//     );
//     passport.use(this);
//   }

//   public async verify(req, payload, done) {
//     const isValid = await this.authService.validateAuth(payload);
//     if (!isValid) {
//       return done('Unauthorized', false);
//     }
//     done(null, payload);
//   }
// }
