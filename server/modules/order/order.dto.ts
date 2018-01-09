import { AEntityBase } from '../../common/entity/index';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { IsIn, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { enum2arr } from '../../../helpers/enum';
import { OrderStateEnum } from './order.state.enum';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';
import { ShopEntity } from '../shop/shop.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';

export class OrderPostDto extends AEntityBase {
  @IsDecimalString()
  price: number;

  @IsDecimalString()
  manufacturingCost: number;

  @IsIn(enum2arr(OrderStateEnum))
  state: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  shop: ShopEntity;

  @ValidateNested()
  @Type(() => DtoBase)
  paymentList: PaymentEntity[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DtoBase)
  customer: CustomerEntity;

  @ValidateNested()
  @Type(() => DtoBase)
  rejection: RejectionEntity;

  @ValidateNested()
  @Type(() => DtoBase)
  delivery: DeliveryEntity;
}