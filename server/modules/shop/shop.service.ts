import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { ShopEntity } from './shop.entity';

@Component()
export class ShopService extends AServiceBase<ShopEntity> {
  constructor( @Inject('ShopRepositoryToken') _repository: Repository<ShopEntity>) {
    super(_repository);
  }
}
