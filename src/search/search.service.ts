import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchQueryDto } from './dto/search.dto';
import { parsePagination } from 'src/common/helpers/parsePagination.helper';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}

  // to-do return count of table rows
  async search(query: SearchQueryDto) {
    const { skip, take } = parsePagination(query.pageNumber, query.pageSize);

    return this.prismaService.track.findMany({
      skip,
      take,
      where: {
        OR: [
          { title: { contains: query.q } },
          { artist: { name: { contains: query.q } } },
        ],
        genre: query.genre,
      },
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
