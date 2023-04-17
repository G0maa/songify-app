import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetHistoryDto } from './dto/get-history.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @UseGuards(JwtGuard)
  @Get()
  @ApiBearerAuth()
  getHistory(@Query() query: GetHistoryDto, @GetUser('id') userId: number) {
    return this.historyService.getHistory(query, userId);
  }
}
