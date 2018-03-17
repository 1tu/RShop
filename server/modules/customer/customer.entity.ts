import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { CityEntity } from '../city/city.entity';
import { ContactEntity } from '../contact/contact.entity';
import { ImageEntity } from '../image/image.entity';

@Entity('customer')
export class CustomerEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  nameFirst: string;

  @Column({ length: 100, nullable: true })
  nameSecond: string;

  @Column({ length: 100 })
  nameLast: string;

  @Column('date', { nullable: true })
  birthdate: Date;

  @Column({ length: 15 })
  phone: string;

  @Column()
  address: string;

  @Column({ length: 12, nullable: true })
  INN: string;

  @Column({ length: 9, nullable: true })
  BIK: string;

  @Column({ length: 20, nullable: true })
  accountNumber: string;

  // TODO: @Column('enum', { enum: CustomerCameFromEnum })
  @Column({ nullable: true })
  cameFrom: number;

  @ManyToOne(type => CityEntity)
  city: CityEntity;

  @OneToOne(type => ImageEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  photo: ImageEntity;

  @OneToMany(type => ContactEntity, contact => contact.customer)
  contactList: ContactEntity[];
}
