import { AEntityBase } from '../../common/entity';
import { IsString, MaxLength } from 'class-validator';

export class PermissionDto extends AEntityBase {
  @IsString()
  @MaxLength(100)
  name: string;
}
