import { SeoTemplateEntity } from '../../../../server/modules/seoTemplate/seoTemplate.entity';

export interface SeoTemplateStoreState {
  item: SeoTemplateEntity;
  list: SeoTemplateEntity[];
}
