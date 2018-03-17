import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { enum2arr } from '../../../helpers/enum.helper';
import { DtoBase } from '../../common/entity/base.dto';
import { CityEntity } from '../city/city.entity';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { DeliveryStateEnum } from './delivery.state.enum';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';

export class DeliveryPostDto {
  @IsDecimalString()
  price: string;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  sentAt?: Date;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  approximateRecieveAt?: Date;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  recievedAt?: Date;

  @ValidateIf((e, value) => value)
  @IsString()
  @MaxLength(250)
  deliveryPoint?: string;

  @ValidateIf((e, value) => value)
  @IsBoolean()
  deliveryHome?: boolean;

  @IsIn(enum2arr(DeliveryStateEnum))
  state: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  city: CityEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  deliveryService: DeliveryServiceEntity;
}
