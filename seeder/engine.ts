import * as csv from 'csvtojson';
import { AEntityBase } from '../server/common/entity/base.entity';
import { AServiceBase } from '../server/common/service/base.service';

interface SeederItem {
  service: AServiceBase<AEntityBase>;
  filePath: string;
  queue: any[];
}

class DatabaseSeeder {
  private _queue: SeederItem[] = [];
  private _isSeeding: boolean = false;

  public addSeed(service: AServiceBase<AEntityBase>, filePath: string) {
    this._parse({ service, filePath, queue: [] });
  }

  private _parse(item: SeederItem) {
    const queue = [];
    csv({ ignoreEmpty: true })
      .fromFile(item.filePath)
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
        this._queue.push(item);
        this._seed();
      });
  }

  private async _seed(force?: boolean) {
    if (this._isSeeding && !force) return;
    this._isSeeding = true;
    const seeder = this._queue.shift();
    try {
      if ((await seeder.service.get()).length) return this._seedingFinish();
      await seeder.service.post(seeder.queue as any);

      console.log(`SEED DONE: ${seeder.filePath}`);
    } catch (error) {
      console.log(`SEED ERROR: ${seeder.filePath}`, error);
    }
    this._seedingFinish();
  }

  private _seedingFinish() {
    if (this._queue.length) setTimeout(() => this._seed(true), 200);
    else this._isSeeding = false;
  }
}

export const databaseSeeder = new DatabaseSeeder();
