import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { DtoBase } from '../../common/entity/base.dto';
import { CityEntity } from '../city/city.entity';
import { DeliveryServiceMaxSizes } from './deliveryService.maxSizes';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';

export class DeliveryServicePostDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @MaxLength(40)
  adapter: string;

  @ValidateIf((e, value) => value)
  @ValidateNested()
  sizes?: DeliveryServiceMaxSizes;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  maxWeight?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  cityList: CityEntity[];
}
