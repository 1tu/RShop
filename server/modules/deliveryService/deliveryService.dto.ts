import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { AEntityBase } from '../../common/entity';
import { DtoBase } from '../../common/entity/base.dto';
import { CityEntity } from '../city/city.entity';
import { DeliveryServiceMaxSizes } from './deliveryService.maxSizes';

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
  maxWeight?: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  cityList: CityEntity[];
}
