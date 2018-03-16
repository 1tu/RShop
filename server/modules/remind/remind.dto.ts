import { IsBoolean, IsISO8601, IsString, MaxLength, ValidateIf } from 'class-validator';

import { AEntityBase } from '../../common/entity';

export class RemindDto {
  @IsString()
  @MaxLength(250)
  description: string;

  @IsISO8601()
  remindAt: Date;

  @ValidateIf((e, value) => value)
  @IsBoolean()
  isStopped?: boolean;
}
