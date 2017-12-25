import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { ShopEntity } from '../shop/shop.entity';
import { ProductSchema } from './product.schema';

@Entity('product')
export class ProductEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('json')
  schema: ProductSchema;

  @ManyToOne(type => ShopEntity, shop => shop.productList)
  shop: ShopEntity;
}
