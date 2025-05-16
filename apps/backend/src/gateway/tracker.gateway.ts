import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { TrackerLocation } from '../../../../packages/shared/types';
  
  @WebSocketGateway({ cors: true })
  export class TrackerGateway {
    @WebSocketServer() server: Server;
    private positions = new Map<string, TrackerLocation>();
  
    handleConnection(client: Socket) {
      const token = client.handshake.auth.token;
      if (token !== 'demo-token') {
        client.disconnect();
        return;
      }
      console.log(`Client connected: ${client.id}`);
    }
  
    @SubscribeMessage('request-initial-data')
    handleInitialData(@ConnectedSocket() client: Socket) {
      const initialData = Array.from(this.positions.values());
      client.emit('tracker-update', initialData);
    }
  
    simulateMovement() {
      if (this.positions.size === 0) {
        for (let i = 0; i < 20; i++) {
          const id = `tracker-${i}`;
          this.positions.set(id, {
            id,
            lat: -6.2088 + Math.random() * 0.02,
            lng: 106.8456 + Math.random() * 0.02,
            lastSeen: new Date().toISOString(),
          });
        }
      }
      setInterval(() => {
        const updates: TrackerLocation[] = [];
        this.positions.forEach((tracker, id) => {
          tracker.lat += Math.random() * 0.001 - 0.0005;
          tracker.lng += Math.random() * 0.001 - 0.0005;
          tracker.lastSeen = new Date().toISOString();
          updates.push(tracker);
        });
        this.server.emit('tracker-update', updates);
      }, 1000);
    }
  }