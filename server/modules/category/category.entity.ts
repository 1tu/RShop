import { Column, Entity, ManyToMany, OneToMany, ManyToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { CategoryShopEntity } from '../category_shop/category_shop.entity';
import { ProductEntity } from '../product/product.entity';
import { ProductCategoryEntity } from '../product_category/product_category.entity';
import { PreManufactureCategoryEntity } from '../preManufacture_category/preManufacture_category.entity';

@Entity('category')
export class CategoryEntity extends AEntityTimestamp {
  @Column({ length: 200 })
  name: string;

  @Column({ length: 200, unique: true })
  nameTranslit: string;

  @Column('boolean', { default: false })
  isBase: boolean;

  // TODO: при удалении связи экземпляр CategoryShopEntity не удаляется из БД
  @OneToMany(type => CategoryShopEntity, cs => cs.category, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  seoList: CategoryShopEntity[];

  @OneToMany(type => ProductCategoryEntity, pc => pc.category)
  productList: ProductCategoryEntity[];

  @OneToMany(type => PreManufactureCategoryEntity, pmc => pmc.category)
  preManufactureList: PreManufactureCategoryEntity[];

  @ManyToOne(type => CategoryEntity, c => c.categoryChildList, { cascadeInsert: true, cascadeUpdate: true })
  categoryParent: CategoryEntity;

  @OneToMany(type => CategoryEntity, c => c.categoryParent, { cascadeInsert: true, cascadeUpdate: true })
  categoryChildList: CategoryEntity[];
}
