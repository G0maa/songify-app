import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  // Generate a JWT token for the user.
  async login(dto: LoginUserDto) {
    const isUser = await this.prismaService.user.findUnique({
      where: { username: dto.username },
    });

    if (!isUser) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await this.verifyPassword(
      dto.password,
      isUser.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const token = await this.signToken(isUser.id, isUser.username);

    return { access_token: token };
  }

  // Creating a new user happens here,
  // I am not sure if this fulfils "separation of concerns".
  async register(dto: CreateUserDto) {
    dto.password = await this.hashPassword(dto.password);
    dto.birthDate = new Date(dto.birthDate);

    const user = await this.prismaService.user.create({ data: dto });

    user.password = undefined;

    return user;
  }

  private async signToken(id: number, username: string) {
    const payload = {
      sub: id,
      username,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  private async hashPassword(password: string) {
    // bcrypt kept complaining, so I did this.
    const saltRounds = parseInt(this.configService.get('SALT_ROUNDS'));

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
