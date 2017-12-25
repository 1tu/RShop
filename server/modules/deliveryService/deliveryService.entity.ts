import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { CityEntity } from '../city/city.entity';

@Entity('deliveryService')
export class DeliveryServiceEntity extends AEntityTimestamp {
  @Column()
  name: string;

  @Column({ length: 40 })
  adapter: string;

  @Column('json')
  maxSize: [number, number, number];

  @Column('decimal', { precision: 14, scale: 4 })
  maxWeight: number;

  @ManyToMany(type => CityEntity)
  @JoinTable()
  cityList: CityEntity[];
}
