import { CategoryEntity } from '../../../../server/modules/category/category.entity';

export interface CategoryStoreState {
  item: CategoryEntity;
  list: CategoryEntity[];
}
