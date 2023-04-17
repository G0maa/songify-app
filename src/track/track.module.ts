import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [HistoryModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
