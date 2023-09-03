import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTrendDto } from './dto/get-trend.dto';
import { parsePagination } from 'src/common/helpers/parsePagination.helper';

@Injectable()
export class TrendService {
  constructor(private prismaService: PrismaService) {}

  async getTrend(query: GetTrendDto) {
    const { skip, take } = parsePagination(query.pageNumber, query.pageSize);

    return await this.prismaService.trackMetrics.findMany({
      skip,
      take,
      where: {
        track: {
          genre: query.genre,
        },
      },
      // to-do 1. flatten object, 2. find a way to reuse repeated select:{}
      select: {
        playCount: true,
        track: {
          select: {
            id: true,
            title: true,
            genre: true,
            duration: true,
            releaseDate: true,
            artist: { select: { name: true } },
          },
        },
      },
      orderBy: { playCount: 'desc' },
    });
  }

  // this function validates nothing,
  // unsure about this.
  async updateTrend(trackId: number) {
    await this.prismaService.trackMetrics.update({
      where: { trackId },
      data: { playCount: { increment: 1 } },
    });
  }
}
