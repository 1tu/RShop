import { Type } from 'class-transformer';
import { IsEmail, IsString, Length, ValidateNested } from 'class-validator';

import { AEntityBase } from '../../common/entity';
import { DtoBase } from '../../common/entity/base.dto';
import { CustomerEntity } from '../customer/customer.entity';

export class UserDto {
  @IsString()
  @Length(5, 50)
  username: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => DtoBase)
  customer: CustomerEntity;
}

export class UserCreateDto extends UserDto {
  @IsString()
  @Length(5, 20)
  password: string;
}
