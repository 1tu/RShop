import { CommonApi } from './internals/base.api';
import { SeoMetaEntity } from '../../server/modules/seoMeta/seoMeta.entity';

class SeoMetaApi extends CommonApi<SeoMetaEntity> {

}

export const seoMetaApi = new SeoMetaApi('seoMeta');
