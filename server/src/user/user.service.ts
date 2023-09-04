import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loggedInUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getOne(dto: loggedInUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.id } });

    // prisma doesn't have exclude option...
    user.password = undefined;

    return user;
  }
}
