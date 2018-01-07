import * as path from 'path';
import * as csv from 'csvtojson';
import { Component } from '@nestjs/common';
import { AEntityBase } from '../entity/index';
import { AServiceBase } from '../service/index';
import { setTimeout } from 'timers';

interface SeederItem {
  service: AServiceBase<AEntityBase>;
  fileName: string;
}

export class DatabaseSeeder {
  private static _queue: SeederItem[] = [];
  private static _isSeeding: boolean = false;

  constructor(service: AServiceBase<AEntityBase>, fileName: string) {
    DatabaseSeeder._queue.push({ service, fileName });
    this.seed();
  }

  private async seed(force?: boolean) {
    if (DatabaseSeeder._isSeeding && !force) return;
    DatabaseSeeder._isSeeding = true;
    const seeder = DatabaseSeeder._queue.shift();
    if ((await seeder.service.get()).length) return DatabaseSeeder._isSeeding = false;
    csv({ ignoreEmpty: true })
      .fromFile(path.join(__dirname, `../../seed/${seeder.fileName}.csv`))
      .on('json', json => {
        for (let key in json) {
          if (/^[\[{]/.test(json[key])) {
            json[key] = JSON.parse(json[key].replace(/\./g, ','));
          }
        }
        seeder.service.post(json);
      })
      .on('done', e => {
        console.log(`${seeder.fileName} seed DONE`);
        if (DatabaseSeeder._queue.length) setTimeout(() => this.seed(true), 200);
        else DatabaseSeeder._isSeeding = false;
      });
  }
}
