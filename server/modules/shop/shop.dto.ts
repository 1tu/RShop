import { IsArray, IsInt, IsString, MaxLength } from 'class-validator';

import { CityEntity } from '../city/city.entity';

export class ShopDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  host: string;

  @IsInt()
  port: number;

  @IsArray()
  cityList: CityEntity[];
}
