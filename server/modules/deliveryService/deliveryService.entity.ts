import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { CityEntity } from '../city/city.entity';
import { DeliveryServiceMaxSizes } from './deliveryService.maxSizes';

@Entity('deliveryService')
export class DeliveryServiceEntity extends AEntityTimestamp {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 40 })
  adapter: string;

  @Column('json', { nullable: true })
  maxSize: DeliveryServiceMaxSizes;

  @Column('decimal', { precision: 14, scale: 4, nullable: true })
  maxWeight: number;

  @ManyToMany(type => CityEntity)
  @JoinTable()
  cityList: CityEntity[];
}
