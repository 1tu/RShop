import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { UserEntity } from '../user/user.entity';

@Entity('remind')
export class RemindEntity extends AEntityTimestamp {
  @Column({ length: 250 })
  description: string;

  @Column('date')
  remindAt: Date;

  @Column('boolean', { default: false })
  isStopped: boolean;

  @ManyToOne(type => UserEntity, user => user.remindList)
  manager: UserEntity;
}
