import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { ShopEntity } from '../shop/shop.entity';
import { ProductProperty } from './product.property';
import { ImageEntity } from '../image/image.entity';

@Entity('product')
export class ProductEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('json', { default: [] })
  propertyList: ProductProperty[];

  @ManyToMany(type => ImageEntity)
  @JoinTable()
  imageList: ImageEntity;

  @ManyToOne(type => ShopEntity, shop => shop.productList)
  shop: ShopEntity;
}