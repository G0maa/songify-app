import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

// to-do: understand how dynamic modules work
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('RABBITMQ_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class MessageQueueModule {}
