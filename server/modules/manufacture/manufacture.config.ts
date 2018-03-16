import { IsString } from 'class-validator';

export class ManufactureConfigItem {
  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsString()
  value: string;

  constructor(name = null, key = null, value = null) {
    this.name = name;
    this.key = key;
    this.value = value;
  }
}
