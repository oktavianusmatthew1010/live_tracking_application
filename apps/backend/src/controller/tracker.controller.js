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
exports.TrackerController = void 0;
const common_1 = require("@nestjs/common");
let TrackerController = class TrackerController {
    constructor() {
        this.mockStore = new Map();
        for (let i = 0; i < 10; i++) {
            this.mockStore.set(`tracker-${i}`, {
                id: `tracker-${i}`,
                lat: 1.35 + Math.random() * 0.02,
                lng: 103.82 + Math.random() * 0.02,
                lastSeen: new Date().toISOString(),
            });
        }
    }
    getAll() {
        return Array.from(this.mockStore.values());
    }
};
exports.TrackerController = TrackerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TrackerController.prototype, "getAll", null);
exports.TrackerController = TrackerController = __decorate([
    (0, common_1.Controller)('trackers'),
    __metadata("design:paramtypes", [])
], TrackerController);
