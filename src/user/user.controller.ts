import { Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { loggedInUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiGetProfileDocs } from './docs/getProfile.docs';

@ApiTags('User')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  // to-do define the response type, probably a userDto :c
  @UseGuards(JwtGuard) // name is in strategy
  @Get('profile')
  @ApiBearerAuth()
  @ApiGetProfileDocs()
  getProfile(
    @GetUser(new ValidationPipe({ validateCustomDecorators: true }))
    user: loggedInUserDto,
  ) {
    return this.userService.getOne(user);
  }
}
