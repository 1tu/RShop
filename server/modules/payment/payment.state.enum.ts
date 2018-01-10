export enum PaymentStateEnum {
  NEW = 0,
  SENDED_TO_CUSTOMER = 1,
  SENDED_TO_SERVICE = 2,
  COMPLETE = 100,
}

export const PaymentStateEnumMap = [
  { id: 0, name: 'Новый' },
  { id: 1, name: 'Клиент уведомлен' },
  { id: 2, name: 'Обрабатывается сервисом' },
  { id: 100, name: 'Завершена' },
];
