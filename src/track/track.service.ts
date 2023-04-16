import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTrackDto } from './dto/get-track.dto';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}

  // should I flatten the result object?
  async getTrack(param: GetTrackDto) {
    return this.prismaService.track.findUnique({
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
  }
}
