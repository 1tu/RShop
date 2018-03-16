import { IsString } from 'class-validator';

export class ProductProperty {
  @IsString()
  name: string;

  @IsString()
  value: string;
  constructor(name: string = '', value: string = '') {
    this.name = name;
    this.value = value;
  }
}
