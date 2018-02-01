import { connect } from 'socket.io-client';
import { EntityActionType, EntityType } from '../../shared/Entity.shared';
import { config } from '../../config/index';

// TODO: вынести в конфиг
export const gateway = connect(`${config.server.protocol}://${config.server.host}:${config.server.port}`);
