import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { ManufactureEntity } from '../manufacture/manufacture.entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { PreManufactureConfigItem } from './preManufacture.configItem';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';

export class PreManufactureDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @MaxLength(150)
  nameTranslit: string;

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

  @ValidateIf((e, value) => value)
  @ValidateNested()
  @Type(() => DtoBase)
  seoTemplate: SeoTemplateEntity;
}
