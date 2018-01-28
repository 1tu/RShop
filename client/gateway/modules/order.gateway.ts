import { gateway } from '../gateway';
import { store } from '../../store/index';
import { OrderTypes } from '../../store/modules/index';
import { EntityType } from '../../../shared/Entity.shared';
import { makeEvent } from '../../../shared/Gateway.shared';

const entity: EntityType = 'Order';

gateway.on(makeEvent(entity, 'Post'), data => {
  store.dispatch(entity + '/' + OrderTypes.action.addNotify);
});

gateway.on(makeEvent(entity, 'Put'), data => {
  store.dispatch(entity + '/' + OrderTypes.action.addNotify);
});
