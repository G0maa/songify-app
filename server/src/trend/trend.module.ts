import { Module } from '@nestjs/common';
import { TrendController } from './trend.controller';
import { TrendService } from './trend.service';

@Module({
  controllers: [TrendController],
  providers: [TrendService],
  exports: [TrendService],
})
export class TrendModule {}
