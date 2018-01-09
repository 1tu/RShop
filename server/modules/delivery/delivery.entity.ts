import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { DeliveryServiceEntity } from '../deliveryService/deliveryService.entity';
import { CityEntity } from '../city/city.entity';

@Entity('delivery')
export class DeliveryEntity extends AEntityTimestamp {
  @Column('decimal', { precision: 14, scale: 2 })
  price: number;

  @Column('date', { nullable: true })
  sentAt: Date;

  @Column('date', { nullable: true })
  approximateRecieveAt: Date;

  @Column('date', { nullable: true })
  recievedAt: Date;

  // TODO: это должнен быть указатель на одно из возможных мест получения у доставщика или же это дом покупателя?
  @Column({ nullable: true })
  deliveryPoint: string;

  @Column('boolean', { default: false })
  deliveryHome: boolean;

  // TODO: @Column('enum', { enum: DeliveryStateEnum })
  @Column()
  state: number;

  @ManyToOne(type => CityEntity)
  city: CityEntity;

  @ManyToOne(type => DeliveryServiceEntity)
  deliveryService: DeliveryServiceEntity;
}
