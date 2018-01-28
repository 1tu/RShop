import {
  AuthStoreState, CityStoreState, CustomerStoreState, UserStoreState, ShopStoreState,
  RemindStoreState, RejectionStoreState, ProductStoreState, PaymentServiceStoreState,
  PaymentStoreState, OrderStoreState, DeliveryServiceStoreState, ContactStoreState, ManufactureStoreState,
} from './modules/index';

export interface RootState {
  navShow: boolean;

  auth?: AuthStoreState;
  City?: CityStoreState;
  Contact?: ContactStoreState;
  Customer?: CustomerStoreState;
  DeliveryService?: DeliveryServiceStoreState;
  Order?: OrderStoreState;
  Payment?: PaymentStoreState;
  PaymentService?: PaymentServiceStoreState;
  Product?: ProductStoreState;
  Manufacture?: ManufactureStoreState;
  Rejection?: RejectionStoreState;
  Remind?: RemindStoreState;
  Shop?: ShopStoreState;
  User?: UserStoreState;
}
