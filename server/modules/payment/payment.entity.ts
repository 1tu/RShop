import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { PaymentServiceEntity } from '../paymentService/paymentService.entity';
import { PaymentStateEnum } from './payment.state.enum';
import { CurrencyEnum } from '../../../@types/enum/currency.enum';
import { OrderEntity } from '../order/order.entity';
import { IsIn } from 'class-validator';
import { enum2arr } from '../../../helpers/enum';

@Entity('payment')
export class PaymentEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 4 })
  amount: string;

  // TODO: @Column('enum', { enum: CurrencyEnum, default: 643 })
  @Column({ enum: CurrencyEnum, default: 643 })
  @IsIn(enum2arr(CurrencyEnum))
  currencyCode: number;

  // TODO: @Column('enum', { enum: PaymentStateEnum })
  @Column({ enum: PaymentStateEnum })
  @IsIn(enum2arr(PaymentStateEnum))
  state: number;

  @ManyToOne(type => PaymentServiceEntity, ps => ps.paymentList)
  paymentService: PaymentServiceEntity;

  @ManyToOne(type => OrderEntity, order => order.paymentList)
  order: OrderEntity;
}
