import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { ProductEntity } from './product.entity';

@Component()
export class ProductService extends AServiceBase<ProductEntity> {
  constructor( @Inject('ProductRepositoryToken') _repository: Repository<ProductEntity>) {
    super(_repository);
  }

  get(opts?: FindManyOptions<ProductEntity>): Promise<ProductEntity[]> {
    return this._repository.find(opts);
  }

  getOneById(id: number, opts?: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
    return this._repository.findOneById(id, { ...opts, relations: ['shop'] });
  }

  getOne(opts: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
    return this._repository.findOne({ ...opts, relations: ['shop'] });
  }
}
