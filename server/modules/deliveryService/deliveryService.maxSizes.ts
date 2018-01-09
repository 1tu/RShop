import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { ValidateIf } from 'class-validator';

export class DeliveryServiceMaxSizes {
  @ValidateIf((e, value) => value)
  @IsDecimalString()
  height: number;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  width: number;

  @ValidateIf((e, value) => value)
  @IsDecimalString()
  length: number;
}
