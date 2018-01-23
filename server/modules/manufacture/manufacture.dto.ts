import { AEntityBase } from '../../common/entity';
import { ValidateNested, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ManufactureSchemaItem } from './manufacture.schema';
import { ProductEntity } from '../product/product.entity';
import { DtoBase } from '../../common/entity/base.dto';

export class ManufactureDto extends AEntityBase {
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
