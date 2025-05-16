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
exports.TrackerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let TrackerGateway = class TrackerGateway {
    constructor() {
        this.positions = new Map();
    }
    handleConnection(client) {
        const token = client.handshake.auth.token;
        if (token !== 'demo-token') {
            client.disconnect();
            return;
        }
        console.log(`Client connected: ${client.id}`);
    }
    handleInitialData(client) {
        const initialData = Array.from(this.positions.values());
        client.emit('tracker-update', initialData);
    }
    simulateMovement() {
        if (this.positions.size === 0) {
            for (let i = 0; i < 10; i++) {
                const id = `tracker-${i}`;
                this.positions.set(id, {
                    id,
                    lat: 1.35 + Math.random() * 0.02,
                    lng: 103.82 + Math.random() * 0.02,
                    lastSeen: new Date().toISOString(),
                });
            }
        }
        setInterval(() => {
            const updates = [];
            this.positions.forEach((tracker, id) => {
                tracker.lat += Math.random() * 0.001 - 0.0005;
                tracker.lng += Math.random() * 0.001 - 0.0005;
                tracker.lastSeen = new Date().toISOString();
                updates.push(tracker);
            });
            this.server.emit('tracker-update', updates);
        }, 1000);
    }
};
exports.TrackerGateway = TrackerGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TrackerGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('request-initial-data'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], TrackerGateway.prototype, "handleInitialData", null);
exports.TrackerGateway = TrackerGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], TrackerGateway);
