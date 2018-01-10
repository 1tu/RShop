import { IsEmail, Length, IsString, ValidateNested } from 'class-validator';
import { AEntityBase } from '../../common/entity';
import { CustomerEntity } from '../customer/customer.entity';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';

export class UserDto extends AEntityBase {
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
