import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';
import { MessageQueueModule } from 'src/message-queue/message-queue.module';

@Module({
  imports: [MessageQueueModule],
  providers: [RecommendService],
  controllers: [RecommendController],
})
export class RecommendModule {}
