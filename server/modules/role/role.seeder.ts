import * as path from 'path';
import { Component } from '@nestjs/common';
import { RoleService } from './role.service';
import * as csv from 'csvtojson';

@Component()
export class RoleSeeder {
  constructor(private _roleService: RoleService) { }

  public async seed() {
    const roles = await this._roleService.get();
    if (roles.length) return;
    csv()
      .fromFile(path.join(__dirname, '../../seed/Role.csv'))
      .on('json', json => this._roleService.post(json))
      .on('done', e => { console.log('Role seed DONE'); });
  }
}
