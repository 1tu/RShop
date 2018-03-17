import axios, { AxiosResponse, AxiosError } from 'axios';
import { isArray } from 'lodash';
import { AEntityBase } from '../../../server/common/entity/index';

interface ApiValidationError<E> {
  children: any[];
  constraints: { [prop: string]: string };
  property: keyof E;
  value: any;
  target: E;
}

export interface ApiError<E> {
  error: string;
  statusCode: number;
  message: string | ApiValidationError<E>;
}

export interface ApiAxiosError<E = any> extends AxiosError {
  response: AxiosResponse<ApiError<E>>;
}

export class CommonApi<M extends AEntityBase> {
  constructor(public modelName: string) { }

  async getList(search?: any): Promise<M[]> {
    return axios.get(`/${this.modelName}`, search).then(res => res.data);
  }

  async get(id: number): Promise<M> {
    return axios.get(`/${this.modelName}/${id}`).then(res => res.data);
  }

  async post(model: Partial<M>): Promise<M> {
    return axios.post(`/${this.modelName}`, model).then(res => res.data);
  }

  async put(model: Partial<M>): Promise<M> {
    return axios.put(`/${this.modelName}`, model).then(res => res.data);
  }

  async delete(id: number): Promise<number> {
    return axios.delete(`/${this.modelName}/${id}`).then(res => res.data);
  }
}
