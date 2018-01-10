import { AEntityBase } from '../../common/entity';
import { IsString, MaxLength, IsISO8601, IsBoolean, ValidateIf } from 'class-validator';

export class RemindDto extends AEntityBase {
  @IsString()
  @MaxLength(250)
  description: string;

  @IsISO8601()
  remindAt: Date;

  @ValidateIf((e, value) => value)
  @IsBoolean()
  isStopped: boolean;
}
