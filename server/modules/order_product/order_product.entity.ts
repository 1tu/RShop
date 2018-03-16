import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityBase } from '../../common/entity';
import { ManufactureConfigItem } from '../manufacture/manufacture.config';
import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';

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
