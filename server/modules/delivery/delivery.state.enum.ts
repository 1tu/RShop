export enum DeliveryStateEnum {
  NEW = 0,
  READY_TO_SHIP = 1,
  SENT = 2,
  RECIEVED = 3,

  // TODO: нужен canceled?
  CANCELED = 500,
  RETURN_SHIPPING = 501,
  REFUSAL = 502,
}

export const DeliveryStateEnumMap: { id: number, name: string }[] = [
  { id: 0, name: 'Новый' },
  { id: 1, name: 'Недозвон' },
  { id: 2, name: 'Отправлено' },
  { id: 3, name: 'Получено' },
  { id: 500, name: 'Отменен' },
  { id: 501, name: 'Возврат доставкой' },
  { id: 502, name: 'Отказ при приёме' },
];
