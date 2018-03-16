import { CommonApi } from './internals/base.api';
import { FilteredPageEntity } from '../../server/modules/filteredPage/filteredPage.entity';

class FilteredPageApi extends CommonApi<FilteredPageEntity> {

}

export const filteredPageApi = new FilteredPageApi('filteredPage');
