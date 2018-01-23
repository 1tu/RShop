import { IsString } from 'class-validator';

export class ProductProperty {
  @IsString()
  key: string;

  @IsString()
  value: string;
  constructor(key: string = '', value: string = '') {
    this.key = key;
    this.value = value;
  }
}
