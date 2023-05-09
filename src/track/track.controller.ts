import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TrackService } from './track.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetTrackDto } from './dto/get-track.dto';
import { OptionalJwtGuard } from 'src/auth/guard/optional-jwt.guard';
import { GetUser } from 'src/auth/decorator';

@ApiTags('Track')
@Controller({
  path: 'track',
  version: '1',
})
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseGuards(OptionalJwtGuard)
  @Get(':id')
  @ApiBearerAuth() // this is optional, unsure if it's shown in the docs
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({ description: 'Resource found' })
  @ApiBadRequestResponse({ description: 'Invalid query' })
  async getTrack(
    @Param() param: GetTrackDto,
    @GetUser('id') userId: number | null,
  ) {
    return this.trackService.getTrack(param, userId);
  }
}
