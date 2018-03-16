import { IsArray, ArrayNotEmpty, ValidateIf } from 'class-validator';

export class FilteredPageFilters {
  @IsArray()
  @ArrayNotEmpty()
  categoryIdList: number[];

  @ValidateIf((e, value) => value)
  @IsArray()
  propertyKeyList: string[];
}
