import { IsString } from 'class-validator';

export class ManufactureConfigItem {
  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsString()
  value: string;
}
