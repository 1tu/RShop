import { IsIn, IsString, ValidateIf } from 'class-validator';

import { enum2arr } from '../../../helpers/enum.helper';
import { AEntityBase } from '../../common/entity';
import { RejectionReasonEnum } from './rejection.reason.enum';

export class RejectionDto {
  @IsIn(enum2arr(RejectionReasonEnum))
  reason: number;

  @ValidateIf((e, value) => value)
  @IsString()
  description?: string;
}
