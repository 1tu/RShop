import { AEntityBase } from '../../common/entity/index';
import { IsString, MaxLength, IsNotEmpty, ValidateNested, ValidateIf } from 'class-validator';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';
import { CityEntity } from '../city/city.entity';
import { DeliveryServiceMaxSizes } from './deliveryService.maxSizes';

export class DeliveryServicePostDto extends AEntityBase {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @MaxLength(40)
  adapter: string;

  @ValidateIf((e, value) => value)
  @ValidateNested()
  sizes: DeliveryServiceMaxSizes;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  maxWeight: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  cityList: CityEntity[];
}
