import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { AEntityBase } from '../../common/entity/base.entity';
import { CityEntity } from '../city/city.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('shop')
export class ShopEntity extends AEntityBase {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 70 })
  domain: string;

  @Column('smallint')
  port: number;

  @OneToMany(type => ProductEntity, product => product.shop)
  productList: ProductEntity[];

  @ManyToMany(type => CityEntity)
  @JoinTable()
  permissionList: CityEntity[];
}
