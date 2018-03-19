import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { ManufactureEntity } from '../manufacture/manufacture.entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { PreManufactureConfigItem } from './preManufacture.configItem';

export class PreManufactureDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @ValidateIf((e, value) => value)
  @IsString()
  description?: string;

  @ValidateIf((e, value) => value)
  @IsArray()
  @ValidateNested()
  config?: PreManufactureConfigItem[];

  // TODO:
  // imageList: ImageEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  manufacture: ManufactureEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  seoMeta: SeoMetaEntity;
}
