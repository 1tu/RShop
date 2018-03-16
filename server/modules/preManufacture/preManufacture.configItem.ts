import { IsBoolean } from 'class-validator';

import { ManufactureConfigItem } from '../manufacture/manufacture.config';

export class PreManufactureConfigItem extends ManufactureConfigItem {
  @IsBoolean()
  isLocked: boolean;

  constructor(name = null, key = null, value = null, isLocked = false) {
    super(name, key, value);
    this.isLocked = isLocked;
  }
}
