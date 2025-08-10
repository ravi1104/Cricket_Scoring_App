"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = class RedisService {
    async onModuleInit() {
        const url = process.env.REDIS_URL || 'redis://localhost:6379';
        this.client = (0, redis_1.createClient)({ url });
        this.subscriber = (0, redis_1.createClient)({ url });
        this.client.on('error', (err) => console.error('Redis client error', err));
        this.subscriber.on('error', (err) => console.error('Redis subscriber error', err));
        await this.client.connect();
        await this.subscriber.connect();
        console.log('Connected to Redis');
    }
    async publish(channel, value) {
        await this.client.publish(channel, value);
    }
    async lpushAndTrim(key, value, limit = 10) {
        await this.client.lPush(key, value);
        await this.client.lTrim(key, 0, limit - 1);
    }
    async lrange(key, start = 0, stop = -1) {
        return await this.client.lRange(key, start, stop);
    }
    async subscribe(channel, cb) {
        await this.subscriber.subscribe(channel, (message) => {
            cb(message);
        });
    }
    async onModuleDestroy() {
        await this.client.quit();
        await this.subscriber.quit();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map