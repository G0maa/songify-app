import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchQueryDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}

  // to-do return count of table rows
  async search(query: SearchQueryDto) {
    const { skip, take } = this.parsePagination(
      query.pageNumber,
      query.pageSize,
    );

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

  // validation verifies that it's a number string
  private parsePagination(page: string, size: string) {
    if (!page) page = '1';
    if (!size) size = '10';

    const parsedPage = parseInt(page);
    let parsedSize = parseInt(size);

    if (parsedSize > 100) parsedSize = 10;

    const skip = (parsedPage - 1) * parsedSize;
    const take = parsedSize;

    return { skip, take };
  }
}
