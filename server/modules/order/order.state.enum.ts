export enum OrderStateEnum {
  NEW = 0, // новый
  NOT_CALL = 1, // недозвон
  THINKS = 2, // думает
  REQUIRED_INFO = 3, // требуется информация
  EXPECTED_PREPAYMENT = 4, // ожидается ПредОплата
  IN_PRODUCTION = 5, // в производстве
  READY_TO_SHIP = 6, // готов к отправке
  SHIPPED = 7, // отправлено
  DELIVERED = 8, // доставлено
  EXPECTED_PAYMENT = 9, // ожидается оплата
  PAID = 10, // оплачено
  RECIEVED = 11, // получено

  COMPLETE = 100, // завершён

  CANCELED = 500, // отменен
  RETURN_SHIPPING = 501, // возврат доставкой
  REFUSAL = 502, // отказ при приёме
}
