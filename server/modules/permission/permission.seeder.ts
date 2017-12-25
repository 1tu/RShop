import * as path from 'path';
import { Component } from '@nestjs/common';
import { PermissionService } from './permission.service';
import * as csv from 'csvtojson';

@Component()
export class PermissionSeeder {
  constructor(private _permissionService: PermissionService) { }

  public async seed() {
    const permissions = await this._permissionService.get();
    if (permissions.length) return;
    csv()
      .fromFile(path.join(__dirname, '../../seed/Permission.csv'))
      .on('json', json => this._permissionService.post(json))
      .on('done', e => { console.log('Permission seed DONE'); });
  }
}
