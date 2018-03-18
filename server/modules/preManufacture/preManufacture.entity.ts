import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { ImageEntity } from '../image/image.entity';
import { ManufactureEntity } from '../manufacture/manufacture.entity';
import { PreManufactureCategoryEntity } from '../preManufacture_category/preManufacture_category.entity';
import { ShopEntity } from '../shop/shop.entity';
import { PreManufactureConfigItem } from './preManufacture.configItem';

@Entity('preManufacture')
export class PreManufactureEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('text') description: string;

  @Column('json', { default: [] })
  config: PreManufactureConfigItem[];

  @ManyToMany(type => ImageEntity)
  @JoinTable()
  imageList: ImageEntity;

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
