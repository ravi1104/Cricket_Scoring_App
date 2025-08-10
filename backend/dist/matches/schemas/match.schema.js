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
exports.MatchSchema = exports.Match = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Match = class Match {
};
exports.Match = Match;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Match.prototype, "matchId4", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Match.prototype, "teamA", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Match.prototype, "teamB", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'ONGOING' }),
    __metadata("design:type", String)
], Match.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Object)
], Match.prototype, "meta", void 0);
exports.Match = Match = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Match);
exports.MatchSchema = mongoose_1.SchemaFactory.createForClass(Match);
//# sourceMappingURL=match.schema.js.map