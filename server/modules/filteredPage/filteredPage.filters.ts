import { ArrayNotEmpty, IsArray, ValidateIf } from 'class-validator';

export class FilteredPageFilters {
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
