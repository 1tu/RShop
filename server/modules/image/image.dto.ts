import { IsString, ValidateIf, MaxLength } from 'class-validator';

export class ImagePostDto {
  @IsString()
  @MaxLength(200)
  alt: string;

  @ValidateIf((e, value) => value)
  @IsString()
  @MaxLength(150)
  name: string;

  @ValidateIf((e, value) => value)
  @IsString()
  description: string;

  @ValidateIf((e, value) => value)
  @MaxLength(150)
  @IsString()
  filepath: string;
}
