import { AEntityBase } from '../../common/entity';
import { ShopEntity } from '../shop/shop.entity';
import { ProductProperty } from './product.property';
import { ImageEntity } from '../image/image.entity';
import { IsString, MaxLength, IsArray, ValidateIf, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';

export class ProductDto extends AEntityBase {
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
