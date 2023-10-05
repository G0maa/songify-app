import { Express } from 'express';
import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { loggedInUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetProfileDocs } from './docs/getProfile.docs';
import { ApiUploadProfilePictureDocs } from './docs/uploadProfilePicture.docs';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiGetProfileDocs()
  getProfile(
    @GetUser(new ValidationPipe({ validateCustomDecorators: true }))
    user: loggedInUserDto,
  ) {
    return this.userService.getOne(user);
  }

  @UseGuards(JwtGuard)
  @Post('uploadProfilePicture')
  @ApiUploadProfilePictureDocs()
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfliePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @GetUser(new ValidationPipe({ validateCustomDecorators: true }))
    user: loggedInUserDto,
  ) {
    await this.userService.uploadProfilePicture(file, user.id);
    return 'Profile Picture Uploaded Sucessfully';
  }
}
