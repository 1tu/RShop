import { Component } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config/index';

@Component()
export class AuthService {
  async createToken(email: string) {
    const token = jwt.sign({ email }, config.auth.secret, { expiresIn: config.auth.expires });
    return {
      expires_in: config.auth.expires,
      access_token: token,
    };
  }

  async validateAuth(signedAuth): Promise<boolean> {
    console.log(signedAuth);
    // put some validation logic here
    // for example query auth by id / email / authname
    return true;
  }
}
