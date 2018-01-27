import { connect } from 'socket.io-client';

// TODO: вынести в конфиг
export const socket = connect('http://localhost:3003');
