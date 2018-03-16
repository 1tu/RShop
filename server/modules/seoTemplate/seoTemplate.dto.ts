import { IsString, MaxLength, ValidateIf } from 'class-validator';

import { AEntityBase } from '../../common/entity/base.entity';

export class SeoTemplatePostDto {
  @IsString()
  h1: string;

  @ValidateIf((e, value) => value)
  @IsString()
  content: string;

  @ValidateIf((e, value) => value)
  @IsString()
  @MaxLength(200)
  video: string;
}
