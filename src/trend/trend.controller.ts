import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TrendService } from './trend.service';
import { GetTrendDto } from './dto/get-trend.dto';

@ApiTags('Trend')
@Controller({
  path: 'trend',
  version: '1',
})
export class TrendController {
  constructor(private trendService: TrendService) {}

  // to-do implement trending by last week, month, year
  @Get()
  @ApiOkResponse({ description: 'Returns Trend array' })
  @ApiBadRequestResponse({ description: 'Invalid query' })
  getTrend(@Query() query: GetTrendDto) {
    return this.trendService.getTrend(query);
  }
}
