import { OrderStateEnum } from './order.state.enum';

export interface StateHistory {
  date: Date;
  from: OrderStateEnum;
  to: OrderStateEnum;
}
