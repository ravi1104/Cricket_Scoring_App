import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { RedisService } from '../common/redis.service';
export declare class CommentaryGateway implements OnModuleInit {
    private readonly redisService;
    server: Server;
    constructor(redisService: RedisService);
    onModuleInit(): Promise<void>;
}
