import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { HistoryModule } from 'src/history/history.module';
import { TrendModule } from 'src/trend/trend.module';

@Module({
  imports: [HistoryModule, TrendModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
