import { AEntityBase } from '../../common/entity';
import { PaymentServiceTaxTypeEnum } from './paymentService.taxType.enum';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { IsIn, IsString, MaxLength, ValidateNested } from 'class-validator';
import { enum2arr } from '../../../helpers/enum.helper';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';

export class PaymentServiceDto extends AEntityBase {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsDecimalString()
  tax: number;

  @IsIn(enum2arr(PaymentServiceTaxTypeEnum))
  taxType: number;

  @ValidateNested()
  @Type(() => DtoBase)
  deliveryService: DeliveryServiceEntity;
}
