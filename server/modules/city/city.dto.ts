import { IsString, MaxLength, IsNumberString } from 'class-validator';
import { AEntityBase } from '../../common/entity/index';

export class CityPostDto extends AEntityBase {
  @IsString()
  @MaxLength(80)
  readonly nameEng: string;

  @IsString()
  @MaxLength(80)
  readonly name: string;

  @IsString()
  @MaxLength(80)
  readonly nameGenitive: string;

  @IsString()
  @MaxLength(80)
  readonly nameDative: string;

  @IsString()
  @MaxLength(80)
  readonly nameAccusative: string;

  @IsString()
  @MaxLength(80)
  readonly nameInstrumental: string;

  @IsString()
  @MaxLength(80)
  readonly namePrepositional: string;

  @IsNumberString()
  readonly population: number;
}
