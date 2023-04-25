import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageQueueService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitRPC({
    exchange: 'finish-exchange',
    routingKey: 'test',
    queue: 'rpc-recieved',
  })
  public async rpcHandler(message: any) {
    console.log('Message received', message);
    return message;
  }

  public async publishTest() {
    return this.amqpConnection.publish('process-exchange', '', {
      msg: 2,
    });
  }

  public async getMsg() {
    const response = await this.amqpConnection.request({
      exchange: 'finish-exchange',
      routingKey: 'test',
      correlationId: '123',
      timeout: 10000,
    });

    return response;
  }
}
