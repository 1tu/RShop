import { Column, Entity, ManyToOne } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';
import { UserEntity } from '../user/user.entity';

@Entity('image')
export class ImageEntity extends AEntityTimestamp {
  @Column({ length: 200 })
  alt: string;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 150 })
  filepath: string;

  @ManyToOne(type => UserEntity)
  user: UserEntity;
}
