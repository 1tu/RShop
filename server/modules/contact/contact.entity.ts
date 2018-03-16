import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { CustomerEntity } from '../customer/customer.entity';
import { UserEntity } from '../user/user.entity';

@Entity('contact')
export class ContactEntity extends AEntityTimestamp {
  @Column('text', { nullable: true })
  log: string;

  @Column()
  result: string;

  @ManyToOne(type => UserEntity, user => user.contactList)
  manager: UserEntity;

  @ManyToOne(type => CustomerEntity, customer => customer.contactList, { eager: true })
  customer: CustomerEntity;
}
