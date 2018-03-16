import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { UserEntity } from '../user/user.entity';

@Entity('image')
export class ImageEntity extends AEntityTimestamp {
  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  filename: string;

  @ManyToOne(type => UserEntity)
  author: UserEntity;
}
