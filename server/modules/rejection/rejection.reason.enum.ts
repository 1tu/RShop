export enum RejectionReasonEnum {
  OTHER = 0,
  NOT_SATISFIED_GOODS = 1,
  NOT_MADE_CONTACT = 2,
  EXPENSIVE_FOUND_CHEAPER = 3,
  IN_ANOTHER_CITY = 4,
  CANT_PAY_VIA_INTERNET = 5,
  NO_NEED_PRODUCT = 6,
  CANT_DELIVER = 7,
}

export const RejectionReasonEnumMap = [
  { id: 0, name: 'Другое' },
  { id: 1, name: 'Не устроил товар' },
  { id: 2, name: 'Не вышел на связь' },
  { id: 3, name: 'Дорого \ нашел дешевле' },
  { id: 4, name: 'Находитесь в другом городе' },
  { id: 5, name: 'Не погу оплачивать через интернет' },
  { id: 6, name: 'Нужно то что мы не делаем \ нет нужного продукта' },
  { id: 7, name: 'Невозможно доставить' },
];
