export enum CustomerCameFromEnum {
  INTERNET_ADVERTISING = 0,
  WORD_OF_MOUTH = 1,
  SEARCH_RESULT = 2,
}

export const CustomerCameFromEnumMap: { id: number, name: string }[] = [
  { id: 0, name: 'Реклама в интернете' },
  { id: 1, name: 'Сарафанное радио' },
  { id: 2, name: 'Результат в поисковике' }
];
