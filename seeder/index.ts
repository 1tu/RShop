import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from '../server/config/index';
import { entityMap } from './entityMap';
import { promisify } from 'util';
import { readdir } from 'fs';
import { join } from 'path';
import { AServiceBase } from '../server/common/service/index';
import { AEntityBase } from '../server/common/entity/base.entity';
import { databaseSeeder } from './engine';

(async function run() {
  const entityNames = entityMap.map(item => item.name);
  const connection = await createConnection(config.db);

  const csvPath = join(__dirname, 'csv4seed');
  const fileList = (await promisify(readdir)(csvPath)).map(file => file.replace('.csv', ''));

  const seederList = entityMap
    .filter(e => fileList.indexOf(e.name) !== -1)
    .map(e => {
      const repo = connection.getRepository(e.entity);
      return { filePath: join(csvPath, e.name + '.csv'), service: new AServiceBase<AEntityBase>(repo) };
    });

  seederList.forEach(item => {
    databaseSeeder.addSeed(item.service, item.filePath);
  });
}());
