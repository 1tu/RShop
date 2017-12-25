import { CommonApi } from './internals/base.api';
import { CustomerEntity } from '../../server/modules/customer/customer.entity';

class CustomerApi extends CommonApi<CustomerEntity> {

}

export const customerApi = new CustomerApi('customer');
