import { IsNumber, ValidateIf } from 'class-validator';

export class DeliveryServiceMaxSizes {
  @ValidateIf((e, value) => value)
  @IsNumber()
  height?: number;

  @ValidateIf((e, value) => value)
  @IsNumber()
  width?: number;

  @ValidateIf((e, value) => value)
  @IsNumber()
  length?: number;
}
