import {
  AuthStoreState, CityStoreState, CustomerStoreState, UserStoreState, ShopStoreState,
  RemindStoreState, RejectionStoreState, ProductStoreState, PaymentServiceStoreState,
  PaymentStoreState, OrderStoreState, DeliveryServiceStoreState, ContactStoreState, ManufactureStoreState,
} from './modules/index';

export interface RootState {
  navShow: boolean;

  auth?: AuthStoreState;
  city?: CityStoreState;
  contact?: ContactStoreState;
  customer?: CustomerStoreState;
  deliveryService?: DeliveryServiceStoreState;
  order?: OrderStoreState;
  payment?: PaymentStoreState;
  paymentService?: PaymentServiceStoreState;
  product?: ProductStoreState;
  manufacture?: ManufactureStoreState;
  rejection?: RejectionStoreState;
  remind?: RemindStoreState;
  shop?: ShopStoreState;
  user?: UserStoreState;
}
