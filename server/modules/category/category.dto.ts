import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateNested, ValidateIf, IsBoolean } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { CategoryShopDto } from '../category_shop/category_shop.dto';
import { CategoryShopEntity } from '../category_shop/category_shop.entity';
import { CategoryEntity } from './category.entity';

export class CategoryPostDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(200)
  nameTranslit: string;

  @IsBoolean() isBase: boolean;

  @ValidateNested()
  @Type(() => CategoryShopDto)
  seoList: CategoryShopEntity[];

  @ValidateIf((e, value) => value)
  @ValidateNested()
  @Type(() => DtoBase)
  categoryParent: CategoryEntity;
}
