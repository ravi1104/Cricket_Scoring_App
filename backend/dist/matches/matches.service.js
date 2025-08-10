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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const match_schema_1 = require("./schemas/match.schema");
const commentary_schema_1 = require("./schemas/commentary.schema");
const counter_schema_1 = require("./schemas/counter.schema");
const pad_1 = require("../utils/pad");
const redis_service_1 = require("../common/redis.service");
const constants_1 = require("../common/constants");
let MatchesService = class MatchesService {
    constructor(matchModel, commentaryModel, counterModel, redisService) {
        this.matchModel = matchModel;
        this.commentaryModel = commentaryModel;
        this.counterModel = counterModel;
        this.redisService = redisService;
    }
    async getNextMatchId4() {
        const key = 'match_id';
        const res = await this.counterModel.findOneAndUpdate({ key }, { $inc: { seq: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true }).exec();
        const seq = res.seq;
        return (0, pad_1.pad4)(seq);
    }
    async startMatch(teamA, teamB, meta) {
        const matchId4 = await this.getNextMatchId4();
        const created = new this.matchModel({ matchId4, teamA, teamB, meta, status: 'ONGOING' });
        await created.save();
        return created.toObject();
    }
    async addCommentary(matchId4, payload) {
        const match = await this.matchModel.findOne({ matchId4 }).exec();
        if (!match)
            throw new common_1.NotFoundException('Match not found');
        if (match.status === 'PAUSED') {
            throw new common_1.BadRequestException('Match is paused');
        }
        const c = new this.commentaryModel(Object.assign(Object.assign({}, payload), { matchId4 }));
        await c.save();
        const key = `${constants_1.REDIS_LAST_10_PREFIX}${matchId4}`;
        const serialized = JSON.stringify({
            _id: c._id,
            matchId4,
            over: c.over,
            ball: c.ball,
            type: c.type,
            runs: c.runs,
            text: c.text,
            createdAt: c.createdAt,
        });
        await this.redisService.lpushAndTrim(key, serialized, 10);
        await this.redisService.publish(constants_1.REDIS_CHANNEL, serialized);
        return c.toObject();
    }
    async getMatchWithCommentary(matchId4) {
        const match = await this.matchModel.findOne({ matchId4 }).lean().exec();
        if (!match)
            throw new common_1.NotFoundException('Match not found');
        const commentary = await this.commentaryModel.find({ matchId4 }).sort({ createdAt: 1 }).lean().exec();
        const key = `${constants_1.REDIS_LAST_10_PREFIX}${matchId4}`;
        const last10 = await this.redisService.lrange(key, 0, -1).catch(() => []);
        return { match, commentary, last10: last10.map((s) => JSON.parse(s)) };
    }
    async listOngoingMatches() {
        return await this.matchModel.find({ status: { $in: ['ONGOING', 'PAUSED'] } }).lean().exec();
    }
    async pauseMatch(matchId4) {
        const m = await this.matchModel.findOneAndUpdate({ matchId4 }, { status: 'PAUSED' }, { new: true }).lean().exec();
        if (!m)
            throw new common_1.NotFoundException('Match not found');
        return m;
    }
    async resumeMatch(matchId4) {
        const m = await this.matchModel.findOneAndUpdate({ matchId4 }, { status: 'ONGOING' }, { new: true }).lean().exec();
        if (!m)
            throw new common_1.NotFoundException('Match not found');
        return m;
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(match_schema_1.Match.name)),
    __param(1, (0, mongoose_1.InjectModel)(commentary_schema_1.Commentary.name)),
    __param(2, (0, mongoose_1.InjectModel)(counter_schema_1.Counter.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        redis_service_1.RedisService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map