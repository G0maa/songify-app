import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecommendService } from './recommend.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@ApiTags('Recommend')
@Controller('recommend')
export class RecommendController {
  constructor(private recommendService: RecommendService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  getMsg(@GetUser('id') id: number) {
    return this.recommendService.getRecommended(id);
  }
}
