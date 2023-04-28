import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetHistoryDto } from './dto/get-history.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@ApiTags('History')
@Controller({
  path: 'history',
  version: '1',
})
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @UseGuards(JwtGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Returns History array' })
  @ApiUnauthorizedResponse({ description: 'User unauthenticated' })
  @ApiBadRequestResponse({ description: 'Invalid query' }) // to-do issue #20
  getHistory(@Query() query: GetHistoryDto, @GetUser('id') userId: number) {
    return this.historyService.getHistory(query, userId);
  }
}
