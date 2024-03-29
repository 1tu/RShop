import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';
import { ShopEntity } from '../shop/shop.entity';
import { FilteredPageFilters } from './filteredPage.filters';

@Entity('filteredPage')
export class FilteredPageEntity extends AEntityTimestamp {
  @Column({ length: 200 })
  name: string;

  @Column({ nullable: true })
  url: string;

  @Column('jsonb') filters: FilteredPageFilters;

  @OneToOne(type => SeoTemplateEntity, { cascadeInsert: true, eager: true })
  @JoinColumn()
  seoTemplate: SeoTemplateEntity;

  @OneToOne(type => SeoMetaEntity, { cascadeInsert: true, eager: true })
  @JoinColumn()
  seoMeta: SeoMetaEntity;

  @ManyToOne(type => ShopEntity)
  shop: ShopEntity;
}
