import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { PaymentServiceEntity } from '../paymentService/paymentService.entity';
import { PaymentStateEnum } from './payment.state.enum';
import { CurrencyEnum } from '../../../@types/enum/currency.enum';
import { OrderEntity } from '../order/order.entity';

@Entity('payment')
export class PaymentEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 4 })
  amount: string;

  // @Column('enum', { enum: CurrencyEnum, default: 'RUB' })
  @Column({ enum: CurrencyEnum, default: 'RUB' })
  currencyCode: string;

  // @Column('enum', { enum: PaymentStateEnum })
  @Column({ enum: PaymentStateEnum })
  state: string;

  @ManyToOne(type => PaymentServiceEntity, ps => ps.paymentList)
  paymentService: PaymentServiceEntity;

  @ManyToOne(type => OrderEntity, order => order.paymentList)
  order: OrderEntity;
}
