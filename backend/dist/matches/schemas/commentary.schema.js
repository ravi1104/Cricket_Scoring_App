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
exports.CommentarySchema = exports.Commentary = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Commentary = class Commentary {
};
exports.Commentary = Commentary;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Commentary.prototype, "matchId4", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Commentary.prototype, "over", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Commentary.prototype, "ball", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['run', 'wicket', 'wide', 'no-ball', 'bye', 'leg-bye', 'other'] }),
    __metadata("design:type", String)
], Commentary.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Commentary.prototype, "runs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Commentary.prototype, "text", void 0);
exports.Commentary = Commentary = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Commentary);
exports.CommentarySchema = mongoose_1.SchemaFactory.createForClass(Commentary);
//# sourceMappingURL=commentary.schema.js.map