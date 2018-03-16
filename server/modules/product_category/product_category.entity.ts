import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityBase } from '../../common/entity';
import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('product_category')
export class ProductCategoryEntity extends AEntityBase {
  @ManyToOne(type => ProductEntity)
  product: ProductEntity;

  @ManyToOne(type => CategoryEntity)
  category: CategoryEntity;

  @Column('boolean', { default: false })
  isMain: boolean;
}
