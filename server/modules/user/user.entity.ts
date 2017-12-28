import { Entity, Column, ManyToOne, OneToOne, OneToMany, JoinColumn, BeforeInsert, AfterLoad, AfterInsert, BeforeRemove, AfterUpdate } from 'typeorm';
import { IsEmail, Length, } from 'class-validator';
import { AEntityTimestamp } from '../../common/entity';
import { RoleEntity } from '../role/role.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { RemindEntity } from '../remind/remind.entity';
import { ContactEntity } from '../contact/contact.entity';
import { OrderEntity } from '../order/order.entity';
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity extends AEntityTimestamp {
  @Column({ length: 50 })
  @Length(5, 50)
  username: string;

  @Column({ length: 100 })
  @IsEmail()
  email: string;

  @Column({ length: 200, select: false })
  @Length(5, 20)
  password: string;

  @Column({ nullable: true, select: false })
  salt: string;

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


  @BeforeInsert()
  hashPassword() {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 128, 'sha512').toString('base64');
  }

  checkPassword(password: string) {
    if (!password) return false;
    return crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha512').toString('base64') === this.password;
  }
}
