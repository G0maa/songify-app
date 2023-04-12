import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiRegisterDocs } from './docs/register.docs';
import { ApiLoginDocs } from './docs/login.docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiLoginDocs()
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiRegisterDocs()
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
