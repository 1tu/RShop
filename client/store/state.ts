import {
  AuthStoreState,
  CategoryStoreState,
  CityStoreState,
  ContactStoreState,
  CustomerStoreState,
  DeliveryServiceStoreState,
  FilteredPageStoreState,
  ManufactureStoreState,
  OrderStoreState,
  PaymentServiceStoreState,
  PaymentStoreState,
  PreManufactureStoreState,
  ProductStoreState,
  RejectionStoreState,
  RemindStoreState,
  SeoMetaStoreState,
  SeoTemplateStoreState,
  ShopStoreState,
  UserStoreState
} from './modules';

export interface Alert {
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

export interface RootState {
  navShow: boolean;
  alertList: Alert[];

  auth?: AuthStoreState;
  Category?: CategoryStoreState;
  City?: CityStoreState;
  Contact?: ContactStoreState;
  Customer?: CustomerStoreState;
  DeliveryService?: DeliveryServiceStoreState;
  FilteredPage?: FilteredPageStoreState;
  Order?: OrderStoreState;
  Payment?: PaymentStoreState;
  PaymentService?: PaymentServiceStoreState;
  PreManufacture?: PreManufactureStoreState;
  Product?: ProductStoreState;
  Manufacture?: ManufactureStoreState;
  Rejection?: RejectionStoreState;
  Remind?: RemindStoreState;
  SeoMeta?: SeoMetaStoreState;
  SeoTemplate?: SeoTemplateStoreState;
  Shop?: ShopStoreState;
  User?: UserStoreState;
}
