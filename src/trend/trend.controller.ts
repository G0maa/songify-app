import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrendService } from './trend.service';
import { GetTrendDto } from './dto/get-trend.dto';

@ApiTags('Trend')
@Controller('trend')
export class TrendController {
  constructor(private trendService: TrendService) {}

  // to-do implement trending by last week, month, year
  @Get()
  getTrend(@Query() query: GetTrendDto) {
    return this.trendService.getTrend(query);
  }
}
