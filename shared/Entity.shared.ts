export type EntityType = 'Shop' | 'City' | 'Order' | 'Customer' | 'Contact'
  | 'Product' | 'Manufacture' | 'Remind' | 'Rejection' | 'Payment' | 'PaymentService'
  | 'Delivery' | 'DeliveryService' | 'User' | 'Role' | 'Permission' | 'Image'
  | 'Category' | 'FilteredPage' | 'PreManufacture' | 'SeoMeta' | 'SeoTemplate';

export const entityList: EntityType[] = [
  'Permission', 'City', 'Image', 'DeliveryService', 'Rejection', 'Role', 'User', 'PaymentService',
  'Delivery', 'Manufacture', 'Contact', 'Remind', 'Payment', 'Customer', 'Shop', 'Product', 'Order',
  'Category', 'FilteredPage', 'PreManufacture', 'SeoMeta', 'SeoTemplate',
];

export type EntityActionType = 'GetList' | 'Get' | 'Post' | 'Put' | 'Delete';

export const entityActionList: EntityActionType[] = ['GetList', 'Get', 'Post', 'Put', 'Delete'];
