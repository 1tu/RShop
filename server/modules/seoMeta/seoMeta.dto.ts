import { IsArray, IsString, MaxLength, ValidateIf, ArrayNotEmpty } from 'class-validator';

import { AEntityBase } from '../../common/entity/base.entity';

export class SeoMetaPostDto {
  @IsArray()
  @ArrayNotEmpty()
  keys: string[];

  @IsString()
  keywords: string;

  @IsString()
  description: string;

  @IsString()
  @MaxLength(150)
  title: string;
}
