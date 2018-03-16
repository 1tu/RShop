import { FilteredPageEntity } from '../../../../server/modules/filteredPage/filteredPage.entity';

export interface FilteredPageStoreState {
  item: FilteredPageEntity;
  list: FilteredPageEntity[];
}
