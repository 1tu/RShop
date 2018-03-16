import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { AEntityBase } from '../../common/entity/base.entity';
import { CityEntity } from '../city/city.entity';
import { PreManufactureEntity } from '../preManufacture/preManufacture.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('shop')
export class ShopEntity extends AEntityBase {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  host: string;

  @Column('smallint')
  port: number;

  @OneToMany(type => ProductEntity, product => product.shop)
  productList: ProductEntity[];

  @OneToMany(type => PreManufactureEntity, pm => pm.shop)
  preManufactureList: PreManufactureEntity[];

  @ManyToMany(type => CityEntity)
  @JoinTable()
  cityList: CityEntity[];
}
