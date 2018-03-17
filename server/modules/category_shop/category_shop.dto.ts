import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { CategoryEntity } from '../category/category.entity';
import { SeoMetaPostDto } from '../seoMeta/seoMeta.dto';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { SeoTemplatePostDto } from '../seoTemplate/seoTemplate.dto';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';
import { ShopEntity } from '../shop/shop.entity';

export class CategoryShopDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  shop: ShopEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SeoTemplatePostDto)
  seoTemplate: SeoTemplateEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SeoMetaPostDto)
  seoMeta: SeoMetaEntity;
}
