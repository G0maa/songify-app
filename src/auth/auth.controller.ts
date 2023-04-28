import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRegisterDocs } from './docs/register.docs';
import { ApiLoginDocs } from './docs/login.docs';
import { GetUser } from './decorator';
import { JwtGuard } from './guard';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
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

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto, @GetUser('id') userId: number) {
    return this.authService.resetPassword(dto, userId);
  }
}
