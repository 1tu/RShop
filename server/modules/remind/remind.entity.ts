import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('remind')
export class RemindEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('date')
  remindAt: Date;

  @Column('boolean')
  isStopped: boolean;

  @ManyToOne(type => UserEntity, user => user.remindList)
  manager: UserEntity;

  @ManyToOne(type => CustomerEntity, customer => customer.remindList)
  customer: CustomerEntity;
}
