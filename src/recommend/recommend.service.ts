import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from 'src/prisma/prisma.service';
// Personally I believe a controller/service should not deal with files.
import * as fs from 'fs';
import { parse } from 'csv-parse'; // Currently a dev dependency.

@Injectable()
export class RecommendService {
  private recommend = [];

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private prismaService: PrismaService,
  ) {
    // loadRecommend is async, how does NestJS deal with that?
    // https://docs.nestjs.com/fundamentals/async-providers
    // this feels pretty wrong.
    this.loadRecommend().then((res) => {
      this.recommend = res;
    });
  }

  async getRecommendedV1(id: number) {
    // 1. get all tracks in history
    // [{ trackId: 1 }, ...}]
    const history = await this.prismaService.trackHistory.findMany({
      where: { userId: id },
      select: { trackId: true },
    });

    // Note: This isn't accurate since you can listen to the same track 5 times...
    if (history.length < 5) {
      return {
        message:
          'History enteries are not enough to recommend, must listen to 5+ unique tracks.',
      };
    }

    // 2. get all recommended tracks
    const recommendSet = new Set<number>();
    for (const record of history) {
      const arr: [] = this.recommend[record.trackId];
      for (const element of arr) {
        recommendSet.add(element);
      }
    }

    // print list of recommended tracks
    // note: if the track isn't found in DB i.e. using the sample data,
    // the code will run normally, without getting the track.
    console.log('recommendSet: ', recommendSet);

    // 3. fetch all recommended tracks
    const recommendArr = Array.from(recommendSet);
    const recommend = await this.prismaService.track.findMany({
      where: { id: { in: recommendArr } },
      select: {
        id: true,
        title: true,
        genre: true,
        duration: true,
        releaseDate: true,
        artist: { select: { name: true } },
      },
    });

    return recommend;
  }

  async getRecommendedV2(id: number) {
    const history = await this.prismaService.trackHistory.findMany({
      where: { userId: id },
      select: { trackId: true },
    });

    const historySet = new Set<number>();
    for (const record of history) {
      historySet.add(record.trackId);
    }

    const historyArr = Array.from(historySet);

    if (historyArr.length < 5) {
      return {
        message:
          'History enteries are not enough to recommend, must listen to 5+ unique tracks.',
      };
    }

    const result = await this.rpcRequest(historyArr);

    return result;
  }

  // This publishes a messsage, then waits for a response message too.
  // it gives correlationId & replyTo as properties.
  private async rpcRequest(history: number[]) {
    const response = await this.amqpConnection.request({
      exchange: '', // default exchange, routingKey is the queue name.
      routingKey: 'rpc-queue', // this is the queue declared in the consumer
      payload: { history },
      timeout: 3000,
    });
    return response;
  }

  private async loadRecommend() {
    const parser = fs
      .createReadStream('./prisma/recommend_sample.csv')
      .pipe(parse({ columns: true }));

    const recommend = [];
    for await (const record of parser) {
      const id = +record['id'] + 1;
      const nearestSongs = await JSON.parse(record['nearest_songs']);

      // note: id is converted to a string again here.
      recommend[id] = nearestSongs;
    }

    return recommend;
  }
}
