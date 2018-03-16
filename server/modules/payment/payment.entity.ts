import { Column, Entity, ManyToOne } from 'typeorm';

import { CurrencyEnum } from '../../../shared/enum/currency.enum';
import { AEntityTimestamp } from '../../common/entity';
import { OrderEntity } from '../order/order.entity';
import { PaymentServiceEntity } from '../paymentService/paymentService.entity';
import { PaymentStateEnum } from './payment.state.enum';

@Entity('payment')
export class PaymentEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 4 })
  amount: string;

  // TODO: @Column('enum', { enum: CurrencyEnum, default: 643 })
  @Column({ enum: CurrencyEnum, default: 643 })
  currencyCode: number;

  // TODO: @Column('enum', { enum: PaymentStateEnum })
  @Column({ enum: PaymentStateEnum })
  state: number;

  @ManyToOne(type => PaymentServiceEntity, ps => ps.paymentList, { eager: true })
  paymentService: PaymentServiceEntity;

  @ManyToOne(type => OrderEntity, order => order.paymentList)
  order: OrderEntity;
}
