import { CustomerEntity } from '../../../../server/modules/customer/customer.entity';

export interface CustomerStoreState {
  item: CustomerEntity;
  list: CustomerEntity[];
}
