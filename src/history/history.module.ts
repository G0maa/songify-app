import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  providers: [HistoryService],
  exports: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
