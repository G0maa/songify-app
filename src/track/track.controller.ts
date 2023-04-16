import { Controller, Get, Param } from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger';
import { GetTrackDto } from './dto/get-track.dto';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get(':id')
  async getTrack(@Param() param: GetTrackDto) {
    return this.trackService.getTrack(param);
  }
}
