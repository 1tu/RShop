import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityBase } from '../../common/entity';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('product_category')
export class ProductCategoryEntity extends AEntityBase {
  @ManyToOne(type => ProductEntity, { cascadeInsert: true, cascadeUpdate: true })
  product: ProductEntity;

  @ManyToOne(type => CategoryEntity, { eager: true, cascadeInsert: true, cascadeUpdate: true })
  category: CategoryEntity;

  @Column('boolean', { default: false })
  isMain: boolean;
}
