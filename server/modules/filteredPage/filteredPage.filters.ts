import { IsArray, ArrayNotEmpty, ValidateIf } from 'class-validator';

export class FilteredPageFilters {
  @IsArray()
  @ArrayNotEmpty()
  categoryList: string[];

  @ValidateIf((e, value) => value)
  @IsArray()
  propertyKeyList: string[];
}
