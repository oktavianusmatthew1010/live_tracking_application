import { Injectable, OnModuleInit } from '@nestjs/common';
import { TrackerGateway } from './gateway/tracker.gateway';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly trackerGateway: TrackerGateway) {}

  onModuleInit() {
    this.trackerGateway.simulateMovement();
  }
}
