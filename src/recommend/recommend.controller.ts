import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecommendService } from './recommend.service';

@ApiTags('Recommend')
@Controller('recommend')
export class RecommendController {
  constructor(private recommendService: RecommendService) {}
  @Get('pub')
  publishTest() {
    return this.recommendService.publishTest();
  }
  @Get('getMsg')
  getMsg() {
    // const requestId = '123';
    return this.recommendService.getMsg();
  }
}
