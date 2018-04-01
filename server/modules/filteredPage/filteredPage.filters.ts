import { ArrayNotEmpty, IsArray, ValidateIf, IsNumber } from 'class-validator';

export class FilteredPageFilters {
  @IsNumber() baseCategoryId: number;

  @IsArray()
  @ArrayNotEmpty()
  categoryIdList: number[];

  @ValidateIf((e, value) => value)
  @IsArray()
  propertyKeyValueList: PropertyKeyValueItem[];
}

interface PropertyKeyValueItem {
  key: string;
  valueList: string[];
}
