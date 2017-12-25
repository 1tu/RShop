import { Entity, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsEmail, Length, } from 'class-validator';
import { AEntityTimestamp } from '../../common/entity';
import { RoleEntity } from '../role/role.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { RemindEntity } from '../remind/remind.entity';
import { ContactEntity } from '../contact/contact.entity';
import { OrderEntity } from '../order/order.entity';

@Entity('user')
export class UserEntity extends AEntityTimestamp {
  @Column({ length: 50 })
  @Length(5, 50)
  username: string;

  @Column({ length: 100 })
  @IsEmail()
  email: string;

  @Column({ length: 200 })
  @Length(5, 20)
  password: string;

  @OneToOne(type => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  @ManyToOne(type => RoleEntity)
  role: RoleEntity;

  @OneToMany(type => RemindEntity, remind => remind.manager)
  remindList: RemindEntity[];

  @OneToMany(type => ContactEntity, contact => contact.manager)
  contactList: ContactEntity[];

  @OneToMany(type => OrderEntity, order => order.manager)
  orderList: OrderEntity[];
}
