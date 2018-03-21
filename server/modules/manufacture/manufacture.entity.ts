import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { PreManufactureEntity } from '../preManufacture/preManufacture.entity';
import { ProductEntity } from '../product/product.entity';
import { ManufactureSchemaItem } from './manufacture.schema';

@Entity('manufacture')
export class ManufactureEntity extends AEntityTimestamp {
  @Column('json') schema: ManufactureSchemaItem[];

  @OneToOne(type => ProductEntity, product => product.manufacture, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: ProductEntity;

  @OneToMany(type => PreManufactureEntity, pm => pm.manufacture)
  preManufactureList: PreManufactureEntity[];
}
