import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecommendService } from './recommend.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@ApiTags('Recommend')
@Controller('recommend')
export class RecommendController {
  constructor(private recommendService: RecommendService) {}

  // Which is more RESTful? (similar to the favorites situation)
  // is it: GET /recommend
  // or GET /user/{user_id}/recommend
  // or GET /recommend/{user_id}
  // or GET /user/recommend (since userId is in the token)
  @Version('1')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  getRecommend(@GetUser('id') id: number) {
    return this.recommendService.getRecommendedV1(id);
  }

  // under-development.
  @Version('2')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  getMsg(@GetUser('id') id: number) {
    return this.recommendService.getRecommended(id);
  }
}
