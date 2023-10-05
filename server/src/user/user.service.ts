import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loggedInUserDto } from './dto';
import { MinIoService } from 'src/min-io/min-io.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private minioService: MinIoService,
  ) {}

  async getOne(dto: loggedInUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.id } });

    // prisma doesn't have exclude option...
    user.password = undefined;

    return user;
  }

  // Profile Pictures can be duplicated, in case we upload two with different extensions.
  // as of now localhost:9000/profile-pictures/1.png downloads the file
  async uploadProfilePicture(file: Express.Multer.File, id: number) {
    const extension = file.mimetype.split('/')[1];

    const t = await this.minioService.putObject(
      'profile-pictures',
      `${id}.${extension}`,
      file.buffer,
      file.size,
    );
    console.log(t);
  }
}
