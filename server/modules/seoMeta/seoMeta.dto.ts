import { IsArray, IsString, MaxLength, ValidateIf, ArrayNotEmpty } from 'class-validator';

import { AEntityBase } from '../../common/entity/base.entity';

export class SeoMetaPostDto {
  @IsArray()
  @ArrayNotEmpty()
  keys: string[];

  @ValidateIf((e, value) => value)
  @IsString()
  keywords: string;

  @ValidateIf((e, value) => value)
  @IsString()
  description: string;

  @ValidateIf((e, value) => value)
  @IsString()
  @MaxLength(150)
  title: string;
}
