import {
  CityStoreState, CustomerStoreState, UserStoreState, ShopStoreState,
  RemindStoreState, RejectionStoreState, ProductStoreState, PaymentServiceStoreState,
  PaymentStoreState, OrderStoreState, DeliveryServiceStoreState, ContactStoreState
} from './modules/index';

export interface RootState {
  navShow: boolean;

  city?: CityStoreState;
  contact?: ContactStoreState;
  customer?: CustomerStoreState;
  deliveryService?: DeliveryServiceStoreState;
  order?: OrderStoreState;
  payment?: PaymentStoreState;
  paymentService?: PaymentServiceStoreState;
  product?: ProductStoreState;
  rejection?: RejectionStoreState;
  remind?: RemindStoreState;
  shop?: ShopStoreState;
  user?: UserStoreState;
}
