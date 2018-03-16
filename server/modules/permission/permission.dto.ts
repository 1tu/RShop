import { IsString, MaxLength } from 'class-validator';

import { AEntityBase } from '../../common/entity';

export class PermissionDto {
  @IsString()
  @MaxLength(100)
  name: string;
}
