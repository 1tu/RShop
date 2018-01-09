import { Entity, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { StateHistory } from './order.stateHistory';
import { CityEntity } from '../city/city.entity';
import { ShopEntity } from '../shop/shop.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { UserEntity } from '../user/user.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';

@Entity('order')
export class OrderEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 2 })
  price: number;

  @Column('decimal', { precision: 14, scale: 2 })
  manufacturingCost: number;

  // TODO: @Column('enum', { enum: OrderStateEnum })
  @Column()
  state: number;

  @Column('json')
  stateHistory: StateHistory[];

  @OneToMany(type => PaymentEntity, payment => payment.order)
  paymentList: PaymentEntity[];

  @ManyToOne(type => ShopEntity)
  shop: ShopEntity;

  @ManyToOne(type => UserEntity)
  manager: UserEntity;

  @OneToOne(type => CustomerEntity)
  customer: CustomerEntity;

  @OneToOne(type => RejectionEntity)
  rejection: RejectionEntity;

  @OneToOne(type => DeliveryEntity)
  delivery: DeliveryEntity;
}
