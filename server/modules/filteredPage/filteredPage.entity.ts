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

  @Column('json')
  filters: FilteredPageFilters;

  @OneToOne(type => SeoTemplateEntity)
  @JoinColumn()
  seoTemplate: SeoTemplateEntity;

  @OneToOne(type => SeoTemplateEntity)
  @JoinColumn()
  seoMeta: SeoMetaEntity;

  @ManyToOne(type => ShopEntity)
  shop: ShopEntity;

  @BeforeInsert()
  @BeforeUpdate()
  public createUrl() {
    if (this.url) return;
    this.url = `/catalog/${this.filters.categoryList.join(',')}`
      + (this.filters.propertyKeyList && this.filters.propertyKeyList.length ? '/' + this.filters.categoryList.join(',') : '');
  }
}
