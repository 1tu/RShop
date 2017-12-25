import { CommonApi } from './internals/base.api';
import { RemindEntity } from '../../server/modules/remind/remind.entity';

class RemindApi extends CommonApi<RemindEntity> {

}

export const remindApi = new RemindApi('remind');
