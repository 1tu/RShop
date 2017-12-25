import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp, AEntityBase } from '../../common/entity';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from '../order/order.entity';

@Entity('order_product')
export class OrderProductEntity extends AEntityBase {
  @Column('json')
  schema: { [prop: string]: any };

  @Column('smallint')
  count: number;

  @ManyToOne(type => ProductEntity)
  product: ProductEntity;

  @ManyToOne(type => OrderEntity)
  order: OrderEntity;
}
