import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchQueryDto } from './dto/search.dto';
import { parsePagination } from 'src/common/helpers/parsePagination.helper';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { QueryDslBoolQuery } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SearchService {
  constructor(
    private prismaService: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

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

  async searchV2(query: SearchQueryDto) {
    const { skip, take } = parsePagination(query.pageNumber, query.pageSize);

    // This does not work exactly as it should, *I think*.
    // it should match q in name or title, right now it does both,
    // this works for match, but not for match_phrase.
    const mustArr: QueryDslBoolQuery['must'] = [
      {
        multi_match: {
          query: query.q,
          fields: ['title^2', 'artist.name'],
        },
      },
    ];
    if (query.genre) {
      mustArr.push({
        match: {
          genre: query.genre,
        },
      });
    }

    const result = await this.elasticsearchService.search({
      from: skip,
      size: take,
      index: 'tracks',
      query: {
        bool: {
          must: mustArr,
          should: [
            {
              multi_match: {
                query: query.q,
                fields: ['title^2', 'artist.name'],
                type: 'phrase',
              },
            },
          ],
          // filter: query.genre ? [{ term: { genre: query.genre } }] : [], doesn't work
        },
      },
    });

    const tracks = result.hits.hits.map((track) => track._source);
    console.log(result);

    // has result.hits.total.value but TS: number | SearchTotalHits.
    const count = result.hits.total;

    return { count, tracks };
  }
}
