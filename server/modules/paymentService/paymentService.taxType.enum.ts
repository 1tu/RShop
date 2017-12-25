import { CurrencyEnum } from '../../../@types/enum/currency.enum';

enum E { }

function enumerate<T1 extends typeof E>(e: T1) {
  enum PaymentServiceTaxTypeEnum {
    '%' = 0
  }
  return PaymentServiceTaxTypeEnum as typeof PaymentServiceTaxTypeEnum & T1;
}

export const PaymentServiceTaxTypeEnum = enumerate(CurrencyEnum);
