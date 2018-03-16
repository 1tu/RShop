import { FindManyOptions, FindOneOptions, RemoveOptions, Repository, SaveOptions } from 'typeorm';

import { AEntityBase } from '../entity';

export class AServiceBase<E extends AEntityBase> {
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
    this._repository.merge(instance, model);
    return this._repository.save(instance, opts);
  }

  async delete(id: number, opts?: RemoveOptions) {
    const instance = await this._repository.findOneById(id);
    return this._repository.remove(instance, opts);
  }
}
