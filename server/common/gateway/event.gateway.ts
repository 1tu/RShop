import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class EventGateway {
  @WebSocketServer() server: SocketIO.Server;
}

