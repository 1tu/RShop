import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { AEntityBase } from '../../common/entity';
import { DtoBase } from '../../common/entity/base.dto';
import { ShopEntity } from '../shop/shop.entity';
import { ProductProperty } from './product.property';

export class ProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

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
}
