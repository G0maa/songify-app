import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackHistory } from '@prisma/client';

@Injectable()
export class RecommendService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private prismaService: PrismaService,
  ) {}

  async getRecommended(id: number) {
    // to-do: but is the track favorited?
    // 1. get all tracks favorited by user
    // 2. get all tracks in history
    // then merge them, but how?

    const history = await this.prismaService.trackHistory.findMany({
      where: { userId: id },
      select: { trackId: true, createdAt: true },
    });

    // const favorites = await this.prismaService.trackFavorites.findMany({
    //   where: { userId: id },
    //   select: { trackId: true },
    // });

    // to-do: merge history & favorites
    // move step by step, they're both sorted by ?something?

    console.log('history: ', history);
    // Remains on this side:
    // 1. format history as ML Model expects
    // 2. after receive response, format response as API expects.
    // const response = await this.rpcRequest(history);
    // return response;
    return 'history logged in server';
  }

  // This publishes a messsage, then waits for a response message too.
  // it gives correlationId & replyTo as properties.
  private async rpcRequest(history: TrackHistory[]) {
    const response = await this.amqpConnection.request({
      exchange: '', // default exchange, routingKey is the queue name.
      routingKey: 'rpc-queue', // this is the queue declared in the consumer
      payload: history,
      timeout: 3000,
    });
    return response;
  }
}
