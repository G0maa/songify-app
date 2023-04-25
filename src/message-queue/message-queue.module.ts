import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessageQueueService } from './message-queue.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'process-exchange',
          type: 'fanout',
        },
        {
          name: 'finish-exchange',
          type: 'fanout',
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
    MessageQueueModule,
  ],
  providers: [MessageQueueService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
