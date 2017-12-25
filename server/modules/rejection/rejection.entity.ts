import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { RejectionReasonEnum } from './rejection.reason.enum';

@Entity('rejection')
export class RejectionEntity extends AEntityTimestamp {
  // @Column('enum', { enum: RejectionReasonEnum })
  @Column({ enum: RejectionReasonEnum })
  reason: string;

  @Column('text')
  description: string;
}
