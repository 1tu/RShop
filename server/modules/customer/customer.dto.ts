import { MaxLength, IsMobilePhone, IsNumberString, IsIn, ValidateNested, IsString, IsISO8601, ValidateIf } from 'class-validator';
import { AEntityBase } from '../../common/entity/index';
import { enum2arr } from '../../../helpers/enum';
import { CustomerCameFromEnum } from './customer.cameFrom.enum';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';
import { CityEntity } from '../city/city.entity';

export class CustomerPostDto extends AEntityBase {
  @IsString()
  @MaxLength(100)
  nameFirst: string;

  @ValidateIf((e, value) => value)
  @IsString()
  @MaxLength(100)
  nameSecond: string;

  @IsString()
  @MaxLength(100)
  nameLast: string;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  birthdate: Date;

  @IsMobilePhone('ru-RU')
  phone: string;

  @IsString()
  @MaxLength(250)
  address: string;

  @ValidateIf((e, value) => value)
  @MaxLength(12)
  @IsNumberString()
  INN: string;

  @ValidateIf((e, value) => value)
  @MaxLength(9)
  @IsNumberString()
  BIK: string;

  @ValidateIf((e, value) => value)
  @MaxLength(20)
  @IsNumberString()
  accountNumber: string;

  @ValidateIf((e, value) => value)
  @IsIn(enum2arr(CustomerCameFromEnum))
  cameFrom: number;

  @ValidateNested()
  @Type(() => DtoBase)
  city: CityEntity;

  // TODO:
  // photo: ImageEntity;
}
