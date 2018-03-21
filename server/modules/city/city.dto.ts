import { IsInt, IsString, MaxLength } from 'class-validator';

export class CityPostDto {
  @IsString()
  @MaxLength(80)
  nameTranslit: string;

  @IsString()
  @MaxLength(80)
  name: string;

  @IsString()
  @MaxLength(80)
  nameGenitive: string;

  @IsString()
  @MaxLength(80)
  nameDative: string;

  @IsString()
  @MaxLength(80)
  nameAccusative: string;

  @IsString()
  @MaxLength(80)
  nameInstrumental: string;

  @IsString()
  @MaxLength(80)
  namePrepositional: string;

  @IsInt() population: number;
}
