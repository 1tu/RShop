import * as path from 'path';
import * as csv from 'csvtojson';
import { Component } from '@nestjs/common';
import { AEntityBase } from '../entity/index';
import { AServiceBase } from '../service/index';

interface SeederItem {
  service: AServiceBase<AEntityBase>;
  fileName: string;
  queue: any[];
}

export class DatabaseSeeder {
  private static _queue: SeederItem[] = [];
  private static _isSeeding: boolean = false;

  constructor(service: AServiceBase<AEntityBase>, fileName: string) {
    // DatabaseSeeder._queue.push({ service, fileName, queue: [] });
    this._parse({ service, fileName, queue: [] });
  }

  private _parse(item: SeederItem) {
    const queue = [];
    csv({ ignoreEmpty: true })
      .fromFile(path.join(__dirname, `../../seed/${item.fileName}.csv`))
      .on('json', json => {
        for (let key in json) {
          if (/^[\[{]/.test(json[key])) {
            json[key] = JSON.parse(json[key].replace(/\./g, ','));
          }
        }
        queue.push(json);
      })
      .on('done', e => {
        item.queue = queue;
        DatabaseSeeder._queue.push(item);
        this._seed();
      });
  }

  private async _seed(force?: boolean) {
    if (DatabaseSeeder._isSeeding && !force) return;
    DatabaseSeeder._isSeeding = true;
    const seeder = DatabaseSeeder._queue.shift();
    if ((await seeder.service.get()).length) return DatabaseSeeder._isSeeding = false;
    await seeder.service.post(seeder.queue as any);

    console.log(`${seeder.fileName} seed DONE`);
    if (DatabaseSeeder._queue.length) setTimeout(() => this._seed(true), 200);
    else DatabaseSeeder._isSeeding = false;
  }
}
