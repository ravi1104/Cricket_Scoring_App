import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client!: RedisClientType;     // definitely assigned before use
  private subscriber!: RedisClientType; // definitely assigned before use

  async onModuleInit() {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';

    this.client = createClient({ url });
    this.subscriber = createClient({ url });

    this.client.on('error', (err) => console.error('Redis client error', err));
    this.subscriber.on('error', (err) => console.error('Redis subscriber error', err));

    await Promise.all([
      this.client.connect(),
      this.subscriber.connect(),
    ]);

    console.log('✅ Connected to Redis');
  }

  async publish(channel: string, value: string) {
    await this.client.publish(channel, value);
  }

  async lpushAndTrim(key: string, value: string, limit = 10) {
    await this.client.lPush(key, value);
    await this.client.lTrim(key, 0, limit - 1);
  }

  async lrange(key: string, start = 0, stop = -1) {
    return this.client.lRange(key, start, stop);
  }

  async subscribe(channel: string, cb: (message: string) => void) {
    await this.subscriber.subscribe(channel, (message) => {
      cb(message);
    });
  }

  async onModuleDestroy() {
    await Promise.all([
      this.client.quit(),
      this.subscriber.quit(),
    ]);
  }
}
