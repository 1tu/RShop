import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { ImageEntity } from '../image/image.entity';
import { ManufactureEntity } from '../manufacture/manufacture.entity';
import { ProductCategoryEntity } from '../product_category/product_category.entity';
import { ShopEntity } from '../shop/shop.entity';
import { ProductProperty } from './product.property';

@Entity('product')
export class ProductEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('json', { default: [] })
  propertyList: ProductProperty[];

  @ManyToMany(type => ImageEntity)
  @JoinTable()
  imageList: ImageEntity;

  @ManyToOne(type => ShopEntity, shop => shop.productList)
  shop: ShopEntity;

  @OneToOne(type => ManufactureEntity, m => m.product, { eager: true })
  manufacture?: ManufactureEntity;

  // TODO: при удалении связи экземпляр ProductCategoryEntity не удаляется из БД
  @OneToMany(type => ProductCategoryEntity, pc => pc.product, {
    cascadeInsert: true,
    cascadeUpdate: true,
  })
  categoryList: ProductCategoryEntity[];
}
