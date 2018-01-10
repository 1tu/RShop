import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { PaymentEntity } from '../payment/payment.entity';
import { PaymentServiceTaxTypeEnum } from './paymentService.taxType.enum';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';

@Entity('paymentService')
export class PaymentServiceEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 14, scale: 4 })
  tax: number;

  // TODO: @Column('enum', { enum: PaymentServiceTaxTypeEnum })
  @Column({ enum: PaymentServiceTaxTypeEnum })
  taxType: number;

  @OneToMany(type => PaymentEntity, payment => payment.paymentService)
  paymentList: PaymentEntity[];

  @OneToOne(type => DeliveryServiceEntity)
  @JoinColumn()
  deliveryService: DeliveryServiceEntity;
}
