import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AEntityBase } from '../../common/entity';
import { CategoryEntity } from '../category/category.entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';
import { ShopEntity } from '../shop/shop.entity';

@Entity('category_shop')
export class CategoryShopEntity extends AEntityBase {
  @ManyToOne(type => ShopEntity, { cascadeInsert: true, cascadeUpdate: true, eager: true })
  shop: ShopEntity;

  @ManyToOne(type => CategoryEntity, c => c.seoList)
  category: CategoryEntity;

  @OneToOne(type => SeoTemplateEntity, { eager: true })
  @JoinColumn()
  seoTemplate: SeoTemplateEntity;

  @OneToOne(type => SeoMetaEntity, { eager: true })
  @JoinColumn()
  seoMeta: SeoMetaEntity;
}
