import { IsString, IsArray, ArrayNotEmpty, IsIn, ValidateIf, ValidateNested, IsBoolean } from 'class-validator';
import { IsDecimalString } from '../../../helpers/validators/IsDecimalString.validator';
import { enum2arr } from '../../../helpers/enum.helper';
import { Type } from 'class-transformer';

export enum ManufactureSchemaTypes {
  SELECT = 0,
  SELECT_COLOR = 1,
  SELECT_SIZE = 3,
  SELECT_IMAGE = 2,
  TEXT = 4,
}

export class ManufactureSchemaItem {
  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsIn(enum2arr(ManufactureSchemaTypes))
  type: number;

  @IsBoolean()
  isRequired: boolean;

  @ValidateIf((e: ManufactureSchemaItem, value) => e.type !== ManufactureSchemaTypes.TEXT)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ManufactureSchemaOption)
  optionList: ManufactureSchemaOption[];

  constructor(name = '', key = '', type = 0, isRequired = true, optionList: ManufactureSchemaOption[] = [new ManufactureSchemaOption()]) {
    this.name = name;
    this.key = key;
    this.type = type;
    this.isRequired = isRequired;
    this.optionList = optionList;
  }
}

export class ManufactureSchemaOption {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsDecimalString()
  price: number;

  @ValidateIf((e, value) => value)
  @IsArray()
  @ValidateNested()
  @Type(() => ManufactureSchemaFilter)
  filterList?: ManufactureSchemaFilter[];



  constructor(name = '', value = '', price = 0) {
    this.name = name;
    this.value = value;
    this.price = price;
  }

  // TODO: make SELECT_IMAGE
  // imageId: number;

  // TODO: когда-то...
  // productId: number;
}

type ManufactureSchemaFilterType = '!==' | '===';
export class ManufactureSchemaFilter {
  @IsIn(['!==', '==='])
  type: ManufactureSchemaFilterType;

  @IsArray()
  @ArrayNotEmpty()
  valueList: string[]; // keyof this schema

  constructor(type: ManufactureSchemaFilterType = '!==', valueList = []) {
    this.type = type;
    this.valueList = valueList;
  }
}

export const ManufactureSchemaTypesMap = [
  { id: 0, name: 'Выбор' },
  { id: 1, name: 'Выбор цвета' },
  { id: 3, name: 'Выбор размера' },
  { id: 2, name: 'Выбор отображения' },
  { id: 4, name: 'Текст' },
];
