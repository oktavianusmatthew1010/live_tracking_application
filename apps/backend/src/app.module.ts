import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackerController } from './controller/tracker.controller';
import { TrackerGateway } from './gateway/tracker.gateway';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, TrackerController], 
  providers: [TrackerGateway, AppService],
  exports: [TrackerGateway],
})
export class AppModule {}
