import { IsInt } from 'class-validator';

export class DtoBase {
  @IsInt()
  id: number;
}

