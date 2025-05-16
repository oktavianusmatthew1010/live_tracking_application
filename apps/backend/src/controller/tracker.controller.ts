import { Controller, Get } from '@nestjs/common';
import { TrackerLocation } from '../../../../packages/shared/types';

@Controller('trackers')
export class TrackerController {
  private readonly mockStore = new Map<string, TrackerLocation>();

  constructor() {
    for (let i = 0; i < 20; i++) {
      this.mockStore.set(`tracker-${i}`, {
        id: `tracker-${i}`,
        lat: -6.2088 + Math.random() * 0.02,
        lng: 106.8456 + Math.random() * 0.02,
        lastSeen: new Date().toISOString(),
      });
    }
  }

  @Get()
  getAll(): TrackerLocation[] {
    return Array.from(this.mockStore.values());
  }
}