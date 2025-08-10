import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisClientType } from 'redis';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    client: RedisClientType;
    subscriber: RedisClientType;
    onModuleInit(): Promise<void>;
    publish(channel: string, value: string): Promise<void>;
    lpushAndTrim(key: string, value: string, limit?: number): Promise<void>;
    lrange(key: string, start?: number, stop?: number): Promise<string[]>;
    subscribe(channel: string, cb: (message: string) => void): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
