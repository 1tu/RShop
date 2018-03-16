import { Column, Entity } from 'typeorm';

import { AEntityTimestamp } from '../../common/entity';

@Entity('seoTemplate')
export class SeoTemplateEntity extends AEntityTimestamp {
  @Column('text')
  h1: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ length: 200, nullable: true })
  video: string;
}
