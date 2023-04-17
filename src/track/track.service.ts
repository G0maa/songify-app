import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTrackDto } from './dto/get-track.dto';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class TrackService {
  constructor(
    private prismaService: PrismaService,
    private historyService: HistoryService,
  ) {}

  // should I flatten the result object?
  async getTrack(param: GetTrackDto, userId: number | null) {
    const track = await this.prismaService.track.findUnique({
      where: { id: parseInt(param.id) },
      select: {
        id: true,
        title: true,
        genre: true,
        duration: true,
        releaseDate: true,
        artist: { select: { name: true } },
      },
    });

    if (track && userId) {
      await this.historyService.addTrackToHistory(userId, track.id);
      console.log('todo: update track metrics');
    }

    return track;
  }
}
