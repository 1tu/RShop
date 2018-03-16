import {
  AuthStoreState, CityStoreState, CustomerStoreState, UserStoreState, ShopStoreState,
  RemindStoreState, RejectionStoreState, ProductStoreState, PaymentServiceStoreState,
  PaymentStoreState, OrderStoreState, DeliveryServiceStoreState, ContactStoreState,
  ManufactureStoreState, CategoryStoreState, FilteredPageStoreState, PreManufactureStoreState,
  SeoMetaStoreState, SeoTemplateStoreState,
} from './modules/index';

export interface RootState {
  navShow: boolean;

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
