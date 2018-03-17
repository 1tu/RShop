import { Type } from 'class-transformer';
import { IsIn, IsString, MaxLength, ValidateNested } from 'class-validator';

import { enum2arr } from '../../../helpers/enum.helper';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { DtoBase } from '../../common/entity/base.dto';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { PaymentServiceTaxTypeEnum } from './paymentService.taxType.enum';

export class PaymentServiceDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsDecimalString()
  tax: string;

  @IsIn(enum2arr(PaymentServiceTaxTypeEnum))
  taxType: number;

  @ValidateNested()
  @Type(() => DtoBase)
  deliveryService: DeliveryServiceEntity;
}
