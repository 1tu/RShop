import * as path from 'path';
import { Component } from '@nestjs/common';
import { UserService } from './user.service';
import * as csv from 'csvtojson';

@Component()
export class UserSeeder {
  constructor(private _userService: UserService) { }

  public async seed() {
    const users = await this._userService.get();
    if (users.length) return;
    csv()
      .fromFile(path.join(__dirname, '../../seed/User.csv'))
      .on('json', json => this._userService.post(json))
      .on('done', e => { console.log('User seed DONE'); });
  }
}
