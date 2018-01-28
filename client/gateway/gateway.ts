import { connect } from 'socket.io-client';
import { EntityActionType, EntityType } from '../../shared/Entity.shared';

// TODO: вынести в конфиг
export const gateway = connect('http://localhost:3003');
