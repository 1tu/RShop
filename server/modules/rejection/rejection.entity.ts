import { Entity, Column, ManyToOne } from 'typeorm';
import { AEntityTimestamp } from '../../common/entity';
import { RejectionReasonEnum } from './rejection.reason.enum';
import { IsIn } from 'class-validator';
import { enum2arr } from '../../../helpers/enum';

@Entity('rejection')
export class RejectionEntity extends AEntityTimestamp {
  // @Column('enum', { enum: RejectionReasonEnum })
  @Column({ enum: RejectionReasonEnum })
  @IsIn(enum2arr(RejectionReasonEnum))
  reason: number;

  @Column('text')
  description: string;
}
