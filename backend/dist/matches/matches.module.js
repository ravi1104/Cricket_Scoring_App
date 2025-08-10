"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesModule = void 0;
const common_1 = require("@nestjs/common");
const matches_service_1 = require("./matches.service");
const matches_controller_1 = require("./matches.controller");
const mongoose_1 = require("@nestjs/mongoose");
const match_schema_1 = require("./schemas/match.schema");
const commentary_schema_1 = require("./schemas/commentary.schema");
const counter_schema_1 = require("./schemas/counter.schema");
const redis_service_1 = require("../common/redis.service");
const commentary_gateway_1 = require("../gateway/commentary.gateway");
let MatchesModule = class MatchesModule {
};
exports.MatchesModule = MatchesModule;
exports.MatchesModule = MatchesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: match_schema_1.Match.name, schema: match_schema_1.MatchSchema },
                { name: commentary_schema_1.Commentary.name, schema: commentary_schema_1.CommentarySchema },
                { name: counter_schema_1.Counter.name, schema: counter_schema_1.CounterSchema },
            ]),
        ],
        controllers: [matches_controller_1.MatchesController],
        providers: [matches_service_1.MatchesService, redis_service_1.RedisService, commentary_gateway_1.CommentaryGateway],
        exports: [matches_service_1.MatchesService],
    })
], MatchesModule);
//# sourceMappingURL=matches.module.js.map