import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { AServiceBase } from '../../common/service';
import { ProductEntity } from './product.entity';

@Component()
export class ProductService extends AServiceBase<ProductEntity> {
  constructor( @Inject('ProductRepositoryToken') _repository: Repository<ProductEntity>) {
    super(_repository);
  }
}
