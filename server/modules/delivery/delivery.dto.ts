import { AEntityBase } from '../../common/entity/index';
import { IsISO8601, IsBoolean, IsString, MaxLength, IsIn, ValidateNested, IsNotEmpty, ValidateIf } from 'class-validator';
import { enum2arr } from '../../../helpers/enum';
import { DeliveryStateEnum } from './delivery.state.enum';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { CityEntity } from '../city/city.entity';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';

export class DeliveryPostDto extends AEntityBase {
  @IsDecimalString()
  price: number;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  sentAt: Date;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  approximateRecieveAt: Date;

  @ValidateIf((e, value) => value)
  @IsISO8601()
  recievedAt: Date;

  @ValidateIf((e, value) => value)
  @IsString()
  @MaxLength(250)
  deliveryPoint: string;

  @ValidateIf((e, value) => value)
  @IsBoolean()
  deliveryHome: boolean;

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
