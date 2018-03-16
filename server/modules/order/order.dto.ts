import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { enum2arr } from '../../../helpers/enum.helper';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { AEntityBase } from '../../common/entity';
import { DtoBase } from '../../common/entity/base.dto';
import { CustomerEntity } from '../customer/customer.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';
import { ManufactureConfigItem } from '../manufacture/manufacture.config';
import { OrderProductEntity } from '../order_product/order_product.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { ShopEntity } from '../shop/shop.entity';
import { OrderStateEnum } from './order.state.enum';

export class OrderPostDto {
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

export class OrderApiPostDto {
  @ValidateIf((e, value) => value)
  @IsDecimalString()
  price?: string;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  manufacturingCost?: string;

  @ValidateIf((e, value) => value)
  @IsString()
  productName: string;

  @IsString()
  deliveryServiceName: string;

  @IsDecimalString()
  deliveryPrice: string;

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
