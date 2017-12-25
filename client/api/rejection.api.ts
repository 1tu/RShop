import { CommonApi } from './internals/base.api';
import { RejectionEntity } from '../../server/modules/rejection/rejection.entity';

class RejectionApi extends CommonApi<RejectionEntity> {

}

export const rejectionApi = new RejectionApi('rejection');
