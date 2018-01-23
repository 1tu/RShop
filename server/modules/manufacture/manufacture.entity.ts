import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { ManufactureSchemaItem } from './manufacture.schema';
import { ProductEntity } from '../product/product.entity';

@Entity('manufacture')
export class ManufactureEntity extends AEntityTimestamp {
  @Column('json')
  schema: ManufactureSchemaItem[];

  @OneToOne(type => ProductEntity, product => product.manufacture)
  @JoinColumn()
  product: ProductEntity;
}
