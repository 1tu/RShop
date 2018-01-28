import { EntityType } from '../shared/Entity.shared';
import { AEntityBase } from '../server/common/entity/index';

import { CityEntity } from '../server/modules/city/city.entity';
import { ShopEntity } from '../server/modules/shop/shop.entity';
import { OrderEntity } from '../server/modules/order/order.entity';
import { CustomerEntity } from '../server/modules/customer/customer.entity';
import { ContactEntity } from '../server/modules/contact/contact.entity';
import { ProductEntity } from '../server/modules/product/product.entity';
import { ManufactureEntity } from '../server/modules/manufacture/manufacture.entity';
import { RemindEntity } from '../server/modules/remind/remind.entity';
import { RejectionEntity } from '../server/modules/rejection/rejection.entity';
import { PaymentEntity } from '../server/modules/payment/payment.entity';
import { PaymentServiceEntity } from '../server/modules/paymentService/paymentService.entity';
import { DeliveryEntity } from '../server/modules/delivery/delivery.entity';
import { DeliveryServiceEntity } from '../server/modules/deliveryService/deliveryService.entity';
import { PermissionEntity } from '../server/modules/permission/permission.entity';
import { RoleEntity } from '../server/modules/role/role.entity';
import { UserEntity } from '../server/modules/user/user.entity';
import { ImageEntity } from '../server/modules/image/image.entity';


interface EntityMapItem {
  name: EntityType;
  entity: new (...args: any[]) => AEntityBase;
}

// SORTED!
export const entityMap: EntityMapItem[] = [
  // no deps
  { name: 'Permission', entity: PermissionEntity },
  { name: 'City', entity: CityEntity },
  { name: 'Image', entity: ImageEntity },
  { name: 'DeliveryService', entity: DeliveryServiceEntity },
  { name: 'Rejection', entity: RejectionEntity },
  // one deps
  { name: 'Role', entity: RoleEntity },
  { name: 'User', entity: UserEntity },
  { name: 'PaymentService', entity: PaymentServiceEntity },
  { name: 'Delivery', entity: DeliveryEntity },
  { name: 'Manufacture', entity: ManufactureEntity },
  // +
  { name: 'Contact', entity: ContactEntity },
  { name: 'Remind', entity: RemindEntity },
  { name: 'Payment', entity: PaymentEntity },
  { name: 'Customer', entity: CustomerEntity },
  // ++
  { name: 'Shop', entity: ShopEntity },
  { name: 'Product', entity: ProductEntity },
  // +++
  { name: 'Order', entity: OrderEntity },
];
