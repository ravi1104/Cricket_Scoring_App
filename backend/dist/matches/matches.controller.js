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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesController = void 0;
const common_1 = require("@nestjs/common");
const matches_service_1 = require("./matches.service");
const start_match_dto_1 = require("./dto/start-match.dto");
const add_commentary_dto_1 = require("./dto/add-commentary.dto");
let MatchesController = class MatchesController {
    constructor(matchesService) {
        this.matchesService = matchesService;
    }
    async start(body) {
        const { teamA, teamB, meta } = body;
        const match = await this.matchesService.startMatch(teamA, teamB, meta);
        return match;
    }
    async addCommentary(id, body) {
        const created = await this.matchesService.addCommentary(id, body);
        return created;
    }
    async getMatch(id) {
        return await this.matchesService.getMatchWithCommentary(id);
    }
    async listOngoing() {
        return await this.matchesService.listOngoingMatches();
    }
    async pause(id) {
        return await this.matchesService.pauseMatch(id);
    }
    async resume(id) {
        return await this.matchesService.resumeMatch(id);
    }
};
exports.MatchesController = MatchesController;
__decorate([
    (0, common_1.Post)('start'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof start_match_dto_1.StartMatchDto !== "undefined" && start_match_dto_1.StartMatchDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':id/commentary'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof add_commentary_dto_1.AddCommentaryDto !== "undefined" && add_commentary_dto_1.AddCommentaryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "addCommentary", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getMatch", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "listOngoing", null);
__decorate([
    (0, common_1.Patch)(':id/pause'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "pause", null);
__decorate([
    (0, common_1.Patch)(':id/resume'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "resume", null);
exports.MatchesController = MatchesController = __decorate([
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService])
], MatchesController);
//# sourceMappingURL=matches.controller.js.map