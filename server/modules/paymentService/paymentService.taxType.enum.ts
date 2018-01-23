import { CurrencyEnumMap } from '../../../shared/enum/currency.enum';

export enum PaymentServiceTaxTypeEnum {
  '%' = 0,
  RUB = 643,
  USD = 840,
  EUR = 978,
}

export const PaymentServiceTaxTypeEnumMap = [
  { id: 0, name: '%' },
  ...CurrencyEnumMap
];
