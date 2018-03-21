import { Component, Inject } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { AServiceBase } from '../../common/service';
import { PreManufactureEntity } from './preManufacture.entity';

@Component()
export class PreManufactureService extends AServiceBase<PreManufactureEntity> {
  constructor(@Inject('PreManufactureRepositoryToken') _repository: Repository<PreManufactureEntity>) {
    super(_repository);
  }

  getOneById(id: number, opts?: FindOneOptions<PreManufactureEntity>): Promise<PreManufactureEntity> {
    return this._repository
      .createQueryBuilder('preManufacture')
      .leftJoinAndSelect('preManufacture.categoryList', 'categoryList')
      .leftJoinAndSelect('categoryList.category', 'category')
      .leftJoinAndSelect('preManufacture.manufacture', 'manufacture')
      .leftJoinAndSelect('manufacture.product', 'product')
      .leftJoinAndSelect('preManufacture.seoMeta', 'seoMeta')
      .leftJoinAndSelect('preManufacture.seoTemplate', 'seoTemplate')
      .leftJoinAndSelect('preManufacture.imageList', 'imageList')
      .where('preManufacture.id = :id', { id })
      .getOne();
    // return this._repository.findOneById(id, { ...opts, relations: ['shop', 'manufacture'] });
  }
}
