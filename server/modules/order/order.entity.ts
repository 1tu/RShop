import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { CustomerEntity } from '../customer/customer.entity';
import { DeliveryEntity } from '../delivery/delivery.entity';
import { OrderProductEntity } from '../order_product/order_product.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RejectionEntity } from '../rejection/rejection.entity';
import { ShopEntity } from '../shop/shop.entity';
import { UserEntity } from '../user/user.entity';
import { StateHistory } from './order.stateHistory';

@Entity('order')
export class OrderEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 2, nullable: true })
  price: string;

  @Column('decimal', { precision: 14, scale: 2, nullable: true })
  manufacturingCost: string;

  @Column('text') description: string;

  // TODO: @Column('enum', { enum: OrderStateEnum })
  @Column({ default: 0 })
  state: number;

  @Column('json') stateHistory: StateHistory[];

  @OneToMany(type => PaymentEntity, payment => payment.order)
  paymentList: PaymentEntity[];

  // TODO: при удалении связи экземпляр OrderProductEntity не удаляется из БД
  @OneToMany(type => OrderProductEntity, op => op.order, {
    cascadeInsert: true,
    cascadeUpdate: true,
    eager: true
  })
  productList: OrderProductEntity[];

  @ManyToOne(type => ShopEntity)
  shop: ShopEntity;

  @ManyToOne(type => UserEntity)
  manager: UserEntity;

  @OneToOne(type => CustomerEntity, { cascadeInsert: true, eager: true })
  @JoinColumn()
  customer: CustomerEntity;

  @OneToOne(type => RejectionEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  rejection: RejectionEntity;

  @OneToOne(type => DeliveryEntity, { cascadeInsert: true, onDelete: 'CASCADE' })
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
