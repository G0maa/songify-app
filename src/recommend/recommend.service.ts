import { Injectable } from '@nestjs/common';
import { MessageQueueService } from 'src/message-queue/message-queue.service';

@Injectable()
export class RecommendService {
  constructor(private readonly messageQueueService: MessageQueueService) {}
  publishTest() {
    return this.messageQueueService.publishTest();
  }

  async getMsg() {
    const response = await this.messageQueueService.getMsg();
    return response;
  }
}
