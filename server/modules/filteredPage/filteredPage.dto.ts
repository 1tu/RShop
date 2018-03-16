import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { AEntityBase } from '../../common/entity/base.entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';
import { FilteredPageFilters } from './filteredPage.filters';

export class FilteredPagePostDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @ValidateIf((e, value) => value)
  @IsString()
  url: string;

  @ValidateNested()
  @Type(() => FilteredPageFilters)
  filters: FilteredPageFilters;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  seoTemplate: SeoTemplateEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  seoMeta: SeoMetaEntity;
}
