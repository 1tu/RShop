import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { AEntityBase } from '../../common/entity/base.entity';
import { CustomerEntity } from '../customer/customer.entity';

export class ContactPostDto {
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
