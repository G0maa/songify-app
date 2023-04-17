import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTrackDto } from './dto/get-track.dto';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}

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
      console.log('todo: add track to user history');
      console.log('todo: update track metrics');
    }

    return track;
  }
}
