import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTrackDto } from './dto/get-track.dto';
import { HistoryService } from 'src/history/history.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(
    private prismaService: PrismaService,
    private historyService: HistoryService,
  ) {}

  // should I flatten the result object?
  async getTrack(param: GetTrackDto, userId: number | null) {
    const trackId = parseInt(param.id);

    const transaction: Prisma.PrismaPromise<any>[] = [
      this.prismaService.track.update({
        where: { id: trackId },
        data: {
          metrics: {
            update: { playCount: { increment: 1 } },
          },
        },
        select: {
          id: true,
          title: true,
          genre: true,
          duration: true,
          releaseDate: true,
          artist: { select: { name: true } },
          metrics: { select: { playCount: true } },
        },
      }),
    ];

    if (userId)
      transaction.push(this.historyService.addTrackToHistory(userId, trackId));

    // This is not typed.
    const [track] = await this.prismaService.$transaction(transaction);

    return track;
  }
}
