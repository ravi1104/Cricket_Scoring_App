"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentaryGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const redis_service_1 = require("../common/redis.service");
const constants_1 = require("../common/constants");
let CommentaryGateway = class CommentaryGateway {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async onModuleInit() {
        await this.redisService.subscribe(constants_1.REDIS_CHANNEL, (message) => {
            try {
                const payload = JSON.parse(message);
                const matchRoom = `match:${payload.matchId4}`;
                this.server.to(matchRoom).emit('commentary', payload);
                this.server.emit('commentary', payload);
            }
            catch (err) {
                console.error('Invalid message on redis channel', err);
            }
        });
    }
};
exports.CommentaryGateway = CommentaryGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentaryGateway.prototype, "server", void 0);
exports.CommentaryGateway = CommentaryGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: '/commentary',
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], CommentaryGateway);
//# sourceMappingURL=commentary.gateway.js.map