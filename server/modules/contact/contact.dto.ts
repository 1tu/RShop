import { AEntityBase } from '../../common/entity/base.entity';
import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
import { DtoBase } from '../../common/entity/base.dto';
import { CustomerEntity } from '../customer/customer.entity';

export class ContactPostDto extends AEntityBase {
  @ValidateIf((e, value) => value)
  @IsString()
  log?: string;

  @IsString()
  @MaxLength(250)
  result: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  customer: CustomerEntity;
}
