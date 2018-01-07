export enum DeliveryStateEnum {
  NEW = 0, // новый
  READY_TO_SHIP = 1, // недозвон
  SENT = 2, // отправлено
  RECIEVED = 3, // получено

  // TODO: нужен canceled?
  CANCELED = 500, // отменен
  RETURN_SHIPPING = 501, // возврат доставкой
  REFUSAL = 502, // отказ при приёме
}
