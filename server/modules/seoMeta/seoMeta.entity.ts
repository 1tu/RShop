import { Column, Entity } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';

@Entity('seoMeta')
export class SeoMetaEntity extends AEntityTimestamp {
  @Column('json')
  keys: string[];

  @Column('text')
  keywords: string;

  @Column('text')
  description: string;

  @Column({ length: 150 })
  title: string;
}
