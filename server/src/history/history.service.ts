import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetHistoryDto } from './dto/get-history.dto';
import { parsePagination } from 'src/common/helpers/parsePagination.helper';

@Injectable()
export class HistoryService {
  constructor(private prismaService: PrismaService) {}

  // Note removed async, for $transaction API.
  addTrackToHistory(userId: number, trackId: number) {
    return this.prismaService.trackHistory.create({
      data: {
        trackId,
        userId,
      },
    });
  }

  async getHistory(query: GetHistoryDto, userId: number) {
    const { skip, take } = parsePagination(query.pageNumber, query.pageSize);
    return this.prismaService.trackHistory.findMany({
      skip,
      take,
      where: { userId },
      select: {
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
    });
  }
}
