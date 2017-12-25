import { Entity, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { OrderStateEnum } from './order.state.enum';
import { StateHistory } from './order.stateHistory';
import { CityEntity } from '../city/city.entity';
import { ShopEntity } from '../shop/shop.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { UserEntity } from '../user/user.entity';

@Entity('order')
export class OrderEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 2 })
  deliveryPrice: number;

  @Column('decimal', { precision: 14, scale: 2 })
  price: number;

  @Column('decimal', { precision: 14, scale: 2 })
  manufacturingCost: number;

  // @Column('enum', { enum: OrderStateEnum })
  @Column({ enum: OrderStateEnum })
  state: string;

  @Column('json')
  stateHistory: StateHistory[];

  @OneToMany(type => PaymentEntity, payment => payment.order)
  paymentList: PaymentEntity;

  @ManyToOne(type => DeliveryServiceEntity)
  deliveryService: DeliveryServiceEntity;

  @ManyToOne(type => CityEntity)
  city: CityEntity;

  @ManyToOne(type => ShopEntity)
  shop: ShopEntity;

  @ManyToOne(type => UserEntity)
  manager: UserEntity;

  @OneToOne(type => CustomerEntity)
  customer: CustomerEntity;

  @OneToOne(type => RejectionEntity)
  rejection: RejectionEntity;
}
