import { SeoMetaEntity } from '../../../../server/modules/seoMeta/seoMeta.entity';

export interface SeoMetaStoreState {
  item: SeoMetaEntity;
  list: SeoMetaEntity[];
}
