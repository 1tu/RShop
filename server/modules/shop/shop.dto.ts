import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { CityEntity } from '../city/city.entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';

export class ShopDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  host: string;

  @IsInt() port: number;

  @IsArray() cityList: CityEntity[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  seoMeta: SeoMetaEntity;
}
