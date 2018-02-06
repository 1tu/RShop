import { Entity, Column, ManyToOne, OneToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { StateHistory } from './order.stateHistory';
import { CityEntity } from '../city/city.entity';
import { ShopEntity } from '../shop/shop.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { UserEntity } from '../user/user.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';
import { OrderProductEntity } from '../order_product/order_product.entity';

@Entity('order')
export class OrderEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 2, nullable: true })
  price: number;

  @Column('decimal', { precision: 14, scale: 2, nullable: true })
  manufacturingCost: number;

  // TODO: @Column('enum', { enum: OrderStateEnum })
  @Column({ default: 0 })
  state: number;

  @Column('json')
  stateHistory: StateHistory[];

  @OneToMany(type => PaymentEntity, payment => payment.order)
  paymentList: PaymentEntity[];

  // TODO: при удалении связи экземпляр OrderProductEntity не удаляется из БД
  @OneToMany(type => OrderProductEntity, op => op.order, {
    cascadeInsert: true, cascadeUpdate: true, eager: true
  })
  productList: OrderProductEntity[];

  @ManyToOne(type => ShopEntity)
  shop: ShopEntity;

  @ManyToOne(type => UserEntity)
  manager: UserEntity;

  @OneToOne(type => CustomerEntity, { cascadeInsert: true, cascadeRemove: false, eager: true })
  @JoinColumn()
  customer: CustomerEntity;

  @OneToOne(type => RejectionEntity)
  @JoinColumn()
  rejection: RejectionEntity;

  @OneToOne(type => DeliveryEntity)
  @JoinColumn()
  delivery: DeliveryEntity;


  @BeforeInsert()
  public createHistory() {
    this.stateHistory = [{ from: null, to: this.state, date: new Date() }];
  }

  @BeforeUpdate()
  public updateHistory() {
    if (this.stateHistory[this.stateHistory.length - 1].to !== this.state)
      this.stateHistory.push({ from: this.stateHistory[this.stateHistory.length - 1].to, to: this.state, date: new Date() });
  }
}
