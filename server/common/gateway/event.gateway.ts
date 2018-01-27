import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@WebSocketGateway({ port: 81, namespace: 'event' })
export class EventGateway {
  @WebSocketServer() server: SocketIO.Server;

  @SubscribeMessage('event')
  onEvent(client, data): Observable<WsResponse<number>> {
    const event = 'event';
    const response = [1, 2, 3];

    return Observable.from(response).map(res => ({ event, data: res }));
  }
}

