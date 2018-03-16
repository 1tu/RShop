import { CommonApi } from './internals/base.api';
import { SeoTemplateEntity } from '../../server/modules/seoTemplate/seoTemplate.entity';

class SeoTemplateApi extends CommonApi<SeoTemplateEntity> {

}

export const seoTemplateApi = new SeoTemplateApi('seoTemplate');
