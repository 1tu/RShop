import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { ImageEntity } from '../image/image.entity';
import { RemindEntity } from '../remind/remind.entity';
import { ContactEntity } from '../contact/contact.entity';
import { CustomerCameFromEnum } from './customer.cameFrom.enum';
import { CityEntity } from '../city/city.entity';
import { MaxLength, IsDate, IsMobilePhone, IsNumberString, IsIn } from 'class-validator';
import { enum2arr } from '../../../helpers/enum';

@Entity('customer')
export class CustomerEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  @MaxLength(100)
  nameFirst: string;

  @Column({ length: 100, nullable: true })
  @MaxLength(100)
  nameSecond: string;

  @Column({ length: 100 })
  @MaxLength(100)
  nameLast: string;

  @Column('date')
  @IsDate()
  birthdate: Date;

  @Column({ length: 15 })
  @IsMobilePhone('ru-RU')
  phone: string;

  @Column({ length: 100, nullable: true })
  @MaxLength(100)
  address: string;

  @Column({ length: 12, nullable: true })
  @MaxLength(12)
  @IsNumberString()
  INN: string;

  @Column({ length: 9, nullable: true })
  @MaxLength(9)
  @IsNumberString()
  BIK: string;

  @Column({ length: 20, nullable: true })
  @MaxLength(20)
  @IsNumberString()
  accountNumber: string;

  // TODO: @Column('enum', { enum: CustomerCameFromEnum })
  @Column({ enum: CustomerCameFromEnum, nullable: true })
  @IsIn(enum2arr(CustomerCameFromEnum))
  cameFrom: number;

  @ManyToOne(type => CityEntity)
  city: CityEntity;

  @OneToOne(type => ImageEntity)
  @JoinColumn()
  photo: ImageEntity;

  @OneToMany(type => ContactEntity, contact => contact.customer)
  contactList: ContactEntity[];
}
