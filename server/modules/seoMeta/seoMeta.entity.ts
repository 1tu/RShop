import { Column, Entity } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';

@Entity('seoMeta')
export class SeoMetaEntity extends AEntityTimestamp {
  @Column('json') keys: string[];

  @Column('text', { nullable: true })
  keywords: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 150, nullable: true })
  title: string;
}
