import { IsInt, IsString, MaxLength } from 'class-validator';

export class CityPostDto {
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

  @IsInt()
  readonly population: number;
}
