export enum OrderStateEnum {
  NEW = 0,
  NOT_CALL = 1,
  THINKS = 2,
  REQUIRED_INFO = 3,
  EXPECTED_PREPAYMENT = 4,
  IN_PRODUCTION = 5,
  READY_TO_SHIP = 6,
  SHIPPED = 7,
  DELIVERED = 8,
  EXPECTED_PAYMENT = 9,
  PAID = 10,
  RECIEVED = 11,

  COMPLETE = 100,

  RECALL = 200,

  CANCELED = 500,
  RETURN_SHIPPING = 501,
  REFUSAL = 502,
}

export const OrderStateEnumMap = [
  { id: 0, name: 'Новый' },
  { id: 1, name: 'Недозвон' },
  { id: 2, name: 'Думает' },
  { id: 3, name: 'Требуется информация' },
  { id: 4, name: 'Ожидается предоплата' },
  { id: 5, name: 'В производстве' },
  { id: 6, name: 'Готов к отправке' },
  { id: 7, name: 'Отправлено' },
  { id: 8, name: 'Доставлено' },
  { id: 9, name: 'Ожидается оплата' },
  { id: 10, name: 'Оплачено' },
  { id: 11, name: 'Получено' },
  { id: 100, name: 'Завершён' },
  { id: 500, name: 'Отменен' },
  { id: 501, name: 'Возврат доставкой' },
  { id: 502, name: 'Отказ при приёме' },
];
