import { Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { loggedInUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard) // name is in strategy
  @Get('profile')
  getProfile(
    @GetUser(new ValidationPipe({ validateCustomDecorators: true }))
    user: loggedInUserDto,
  ) {
    return this.userService.getOne(user);
  }
}
