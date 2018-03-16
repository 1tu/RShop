import { IsArray, IsNumberString, IsString, MaxLength } from 'class-validator';

import { AEntityBase } from '../../common/entity/base.entity';
import { CityEntity } from '../city/city.entity';

export class ShopDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  host: string;

  @IsNumberString()
  port: number;

  @IsArray()
  cityList: CityEntity[];
}
