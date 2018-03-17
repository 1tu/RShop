import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateNested, ValidateIf } from 'class-validator';

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

  @ValidateNested()
  @Type(() => CategoryShopDto)
  seoList: CategoryShopEntity[];

  @ValidateIf((e, value) => value)
  @ValidateNested()
  @Type(() => DtoBase)
  categoryParent: CategoryEntity;
}
