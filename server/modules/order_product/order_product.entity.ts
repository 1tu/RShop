import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp, AEntityBase } from '../../common/entity';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from '../order/order.entity';
import { ManufactureConfigItem } from '../manufacture/manufacture.config';

@Entity('order_product')
export class OrderProductEntity extends AEntityBase {
  @Column()
  count: number;

  @Column('json', { nullable: true })
  config: ManufactureConfigItem[];

  @ManyToOne(type => ProductEntity, { eager: true })
  product: ProductEntity;

  @ManyToOne(type => OrderEntity, order => order.productList)
  order: OrderEntity;
}
