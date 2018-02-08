import * as csv from 'csvtojson';
import { AEntityBase } from '../server/common/entity/base.entity';
import { AServiceBase } from '../server/common/service/base.service';

interface SeederItem extends SourceItem {
  queue: any[];
}

export interface SourceItem {
  service: AServiceBase<AEntityBase>;
  filePath: string;
}

class DatabaseSeeder {
  private _queue: SeederItem[] = [];
  private _isSeeding: boolean = false;
  private _source: SourceItem[];

  public addSource(source: SourceItem[]) {
    this._source = source;
    this._source.forEach((item, index) => this._parse({ ...item, queue: [] }, index));
  }

  private _parse(item: SeederItem, index: number) {
    const queue = [];
    csv({ delimiter: ';', ignoreEmpty: true })
      .fromFile(item.filePath)
      .on('json', json => {
        for (let key in json) {
          if (/^[\[{]/.test(json[key])) {
            json[key] = JSON.parse(json[key]);
          }
        }
        queue.push(json);
      })
      .on('done', e => {
        item.queue = queue;
        this._queue[index] = item;
        console.log('PARSE DONE: ' + item.filePath);
        if (this._source.length === this._queue.filter(i => i).length) this._seed();
      });
  }

  private async _seed(force?: boolean) {
    if (this._isSeeding && !force) return;
    this._isSeeding = true;
    const seeder = this._queue.shift();
    console.log('START SEED: ' + seeder.filePath);
    try {
      if ((await seeder.service.get()).length) return this._seedingFinish();
      await seeder.service.post(seeder.queue as any);

      console.log(`SEED DONE: ${seeder.filePath}`);
      this._seedingFinish();
    } catch (error) {
      console.log(`SEED ERROR: ${seeder.filePath}`, error);
      // this._stopSeeding();
    }
  }

  private _seedingFinish() {
    if (this._queue.length) setTimeout(() => this._seed(true), 200);
    else this._isSeeding = false;
  }

  private _stopSeeding() {

  }
}

export const databaseSeeder = new DatabaseSeeder();
