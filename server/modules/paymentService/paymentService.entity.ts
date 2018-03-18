import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { PaymentServiceTaxTypeEnum } from './paymentService.taxType.enum';

@Entity('paymentService')
export class PaymentServiceEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 14, scale: 4 })
  tax: string;

  // TODO: @Column('enum', { enum: PaymentServiceTaxTypeEnum })
  @Column({ enum: PaymentServiceTaxTypeEnum })
  taxType: number;

  @OneToMany(type => PaymentEntity, payment => payment.paymentService)
  paymentList: PaymentEntity[];

  @OneToOne(type => DeliveryServiceEntity)
  @JoinColumn()
  deliveryService: DeliveryServiceEntity;
}
