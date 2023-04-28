import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

// to-do: read from env file
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://localhost:5672',
    }),
    MessageQueueModule, // is this needed?
  ],
  exports: [RabbitMQModule],
})
export class MessageQueueModule {}
