import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityBase } from '../../common/entity';
import { CategoryEntity } from '../category/category.entity';
import { PreManufactureEntity } from '../preManufacture/preManufacture.entity';

@Entity('preManufacture_category')
export class PreManufactureCategoryEntity extends AEntityBase {
  @ManyToOne(type => PreManufactureEntity, { cascadeInsert: true, cascadeUpdate: true })
  preManufacture: PreManufactureEntity;

  @ManyToOne(type => CategoryEntity, { cascadeInsert: true, cascadeUpdate: true, eager: true })
  category: CategoryEntity;

  @Column('boolean', { default: false })
  isMain: boolean;
}
