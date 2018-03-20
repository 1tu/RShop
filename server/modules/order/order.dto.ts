import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsIn, IsInt, IsMobilePhone, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { enum2arr } from '../../../helpers/enum.helper';
import { DtoBase } from '../../common/entity/base.dto';
import { CustomerEntity } from '../customer/customer.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';
import { ManufactureConfigItem } from '../manufacture/manufacture.config';
import { OrderProductEntity } from '../order_product/order_product.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { ShopEntity } from '../shop/shop.entity';
import { OrderStateEnum } from './order.state.enum';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';

export class OrderPostDto {
  @IsDecimalString() price: string;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  manufacturingCost?: string;

  @ValidateIf((e, value) => value)
  @IsString()
  description: string;

  @IsIn(enum2arr(OrderStateEnum))
  state: number;

  @ArrayNotEmpty() productList: OrderProductEntity[];
  // TODO: create dto for junction table
  // @ValidateNested()
  // @Type(() => DtoBase)

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

export class OrderApiPostDto {
  @ValidateIf((e, value) => value)
  @IsNumber()
  price?: string;

  @ValidateIf((e, value) => value)
  @IsNumber()
  manufacturingCost?: string;

  @ValidateIf((e, value) => value)
  @IsString()
  productName: string;

  @IsString() deliveryServiceName: string;

  @IsNumber() deliveryPrice: string;

  @IsString() city: string;

  @ValidateIf((e, value) => value)
  @IsInt()
  count: number;

  @IsMobilePhone('ru-RU') customerPhone: string;

  @IsString() customerName: string;

  @ValidateIf((e, value) => value)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ManufactureConfigItem)
  config?: ManufactureConfigItem[];
}
