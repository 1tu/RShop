import { Repository, FindManyOptions, SaveOptions, RemoveOptions, FindOneOptions } from 'typeorm';
import { Inject } from '@nestjs/common';
import { AEntityBase } from '../entity/index';
import { extend } from 'lodash';

export abstract class AServiceBase<E extends AEntityBase> {
  constructor(protected _repository: Repository<E>) { }

  getOneById(id, opts?: FindOneOptions<E>): Promise<E> {
    return this._repository.findOneById(id, opts);
  }

  getOne(opts: FindOneOptions<E>): Promise<E> {
    return this._repository.findOne(opts);
  }

  get(opts?: FindManyOptions<E>): Promise<E[]> {
    return this._repository.find(opts);
  }

  post(model: Partial<E>, opts?: SaveOptions) {
    const instance = this._repository.create(model);
    return this._repository.save(instance, opts);
  }

  async put(model: Partial<E>, opts?: SaveOptions) {
    let instance = await this._repository.findOneById(model.id);
    instance = extend(instance, model);
    return this._repository.save(instance, opts);
  }

  async delete(id: number, opts?: RemoveOptions) {
    const instance = await this._repository.findOneById(id);
    return this._repository.remove(instance, opts);
  }
}
