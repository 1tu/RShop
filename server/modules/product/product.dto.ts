import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';
import { ShopEntity } from '../shop/shop.entity';
import { ProductProperty } from './product.property';

export class ProductDto {
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
  propertyList?: ProductProperty[];

  // TODO:
  // imageList: ImageEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  shop: ShopEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  seoMeta: SeoMetaEntity;

  @ValidateIf((e, value) => value)
  @ValidateNested()
  @Type(() => DtoBase)
  seoTemplate: SeoTemplateEntity;
}
