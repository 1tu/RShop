import { AEntityBase } from '../../common/entity/index';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import {
  IsIn, IsArray, ValidateNested, IsNotEmpty, ValidateIf,
  ArrayNotEmpty, IsString, IsMobilePhone, IsNumberString
} from 'class-validator';
import { enum2arr } from '../../../helpers/enum.helper';
import { OrderStateEnum } from './order.state.enum';
import { Type } from 'class-transformer';
import { DtoBase } from '../../common/entity/base.dto';
import { ShopEntity } from '../shop/shop.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';
import { OrderProductEntity } from '../order_product/order_product.entity';
import { ManufactureConfigItem } from '../manufacture/manufacture.config';

export class OrderPostDto extends AEntityBase {
  @IsDecimalString()
  price: number;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  manufacturingCost?: number;

  @IsIn(enum2arr(OrderStateEnum))
  state: number;

  @ArrayNotEmpty()
  // TODO: create dto for junction table
  // @ValidateNested()
  // @Type(() => DtoBase)
  productList: OrderProductEntity[];

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

export class OrderApiPostDto extends AEntityBase {
  @ValidateIf((e, value) => value)
  @IsDecimalString()
  price?: number;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  manufacturingCost?: number;

  @ValidateIf((e, value) => value)
  @IsString()
  productName: string;

  @IsString()
  city: string;

  @ValidateIf((e, value) => value)
  @IsNumberString()
  count: number;

  @IsMobilePhone('ru-RU')
  customerPhone: string;

  @IsString()
  customerName: string;

  @ValidateIf((e, value) => value)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ManufactureConfigItem)
  config?: ManufactureConfigItem[];
}
