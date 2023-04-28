import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchQueryDto } from './dto/search.dto';

@ApiTags('Search')
@Controller({
  path: 'search',
  version: '1',
})
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOkResponse({ description: 'Returns Search array' })
  @ApiBadRequestResponse({ description: 'Invalid query' })
  async search(@Query() query: SearchQueryDto) {
    return this.searchService.search(query);
  }
}
