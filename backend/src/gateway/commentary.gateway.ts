import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../common/redis.service';
import { REDIS_CHANNEL } from '../common/constants';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/commentary',
})
@Injectable()
export class CommentaryGateway implements OnModuleInit {
  private readonly logger = new Logger(CommentaryGateway.name);

  @WebSocketServer()
  server!: Server;

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    await this.redisService.subscribe(REDIS_CHANNEL, (message: string) => {
      try {
        const payload = JSON.parse(message);
        const matchRoom = `match:${payload.matchId4}`;

        // Send only to the match room
        this.server.to(matchRoom).emit('commentary', payload);

        // Optionally send globally
        this.server.emit('commentary', payload);

        this.logger.debug(`Broadcasted commentary to ${matchRoom}`);
      } catch (err) {
        this.logger.error('Invalid message on redis channel', err);
      }
    });
  }

  // Allow clients to join a specific match room
  @SubscribeMessage('joinMatch')
  handleJoinMatch(
    @MessageBody('matchId4') matchId4: string,
    @ConnectedSocket() client: Socket,
  ) {
    const matchRoom = `match:${matchId4}`;
    client.join(matchRoom);
    this.logger.log(`Client ${client.id} joined ${matchRoom}`);
  }

  // Optional: Handle disconnects
  @SubscribeMessage('leaveMatch')
  handleLeaveMatch(
    @MessageBody('matchId4') matchId4: string,
    @ConnectedSocket() client: Socket,
  ) {
    const matchRoom = `match:${matchId4}`;
    client.leave(matchRoom);
    this.logger.log(`Client ${client.id} left ${matchRoom}`);
  }
}
