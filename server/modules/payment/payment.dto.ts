import { AEntityBase } from '../../common/entity';
import { PaymentServiceEntity } from '../paymentService/paymentService.entity';
import { PaymentStateEnum } from './payment.state.enum';
import { OrderEntity } from '../order/order.entity';
import { IsIn, IsNotEmpty, ValidateNested } from 'class-validator';
import { enum2arr } from '../../../helpers/enum.helper';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';
import { CurrencyEnum } from '../../../shared/enum/currency.enum';

export class PaymentDto extends AEntityBase {
  @IsDecimalString()
  amount: string;

  @IsIn(enum2arr(CurrencyEnum))
  currencyCode: number;

  @IsIn(enum2arr(PaymentStateEnum))
  state: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  paymentService: PaymentServiceEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  order: OrderEntity;
}
