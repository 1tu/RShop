import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { ImageEntity } from '../image/image.entity';
import { ManufactureEntity } from '../manufacture/manufacture.entity';
import { PreManufactureCategoryEntity } from '../preManufacture_category/preManufacture_category.entity';
import { SeoMetaEntity } from '../seoMeta/seoMeta.entity';
import { SeoTemplateEntity } from '../seoTemplate/seoTemplate.entity';
import { ShopEntity } from '../shop/shop.entity';
import { PreManufactureConfigItem } from './preManufacture.configItem';

@Entity('preManufacture')
export class PreManufactureEntity extends AEntityTimestamp {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, unique: true })
  nameTranslit: string;

  @Column('text') description: string;

  @Column('jsonb', { default: [] })
  config: PreManufactureConfigItem[];

  @ManyToMany(type => ImageEntity, { eager: true })
  @JoinTable()
  imageList: ImageEntity;

  @OneToOne(type => SeoMetaEntity, { cascadeInsert: true })
  @JoinColumn()
  seoMeta: SeoMetaEntity;

  @OneToOne(type => SeoTemplateEntity, { cascadeInsert: true })
  @JoinColumn()
  seoTemplate: SeoTemplateEntity;

  // FIXME: not using
  @ManyToOne(type => ShopEntity, shop => shop.preManufactureList)
  shop: ShopEntity;

  @ManyToOne(type => ManufactureEntity, m => m.preManufactureList)
  manufacture: ManufactureEntity;

  // TODO: при удалении связи экземпляр PreManufactureCategoryEntity не удаляется из БД
  @OneToMany(type => PreManufactureCategoryEntity, pmc => pmc.preManufacture, {
    cascadeInsert: true,
    cascadeUpdate: true,
    eager: true
  })
  categoryList: PreManufactureCategoryEntity[];
}
