import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
