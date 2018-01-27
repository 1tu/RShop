import { AEntityBase } from '../../common/entity/base.entity';
import { CityEntity } from '../city/city.entity';
import { IsString, MaxLength, IsNumberString, ValidateNested, IsArray } from 'class-validator';

export class ShopDto extends AEntityBase {
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
