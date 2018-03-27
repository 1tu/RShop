import { Component, Inject } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { ShopEntity } from './shop.entity';

@Component()
export class ShopService extends AServiceBase<ShopEntity> {
  constructor(@Inject('ShopRepositoryToken') _repository: Repository<ShopEntity>) {
    super(_repository);
  }

  getOneById(id, opts?: FindOneOptions<ShopEntity>): Promise<ShopEntity> {
    return this._repository.findOneById(id, { relations: ['cityList', 'seoMeta'], ...opts });
  }
}
