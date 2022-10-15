import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('testNotifications');
  afterInit(server: any): any {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any, ...args): any {
    console.log('Connected');
  }

  handleDisconnect(client: any): any {
    console.log('Disconnected');
  }

  @SubscribeMessage('notifications')
  search(client: Socket) {
    return { event: 'msgToClient', data: 'Done success' };
  }
}
