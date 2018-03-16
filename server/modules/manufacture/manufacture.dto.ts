import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { AEntityBase } from '../../common/entity';
import { DtoBase } from '../../common/entity/base.dto';
import { ProductEntity } from '../product/product.entity';
import { ManufactureSchemaItem } from './manufacture.schema';

export class ManufactureDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ManufactureSchemaItem)
  schema: ManufactureSchemaItem[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  product: ProductEntity;
}
