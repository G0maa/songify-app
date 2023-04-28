import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { parsePagination } from 'src/common/helpers/parsePagination.helper';
import { GetAllFavoritesDto } from './dto/get-all-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prismaService: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: number) {
    const { trackId } = createFavoriteDto;

    return this.prismaService.trackFavorites.create({
      data: { trackId, userId },
    });
  }

  async findAll(query: GetAllFavoritesDto, userId: number) {
    const { skip, take } = parsePagination(query.pageNumber, query.pageSize);
    return this.prismaService.trackFavorites.findMany({
      skip,
      take,
      where: { userId },
    });
  }

  async remove(id: number, userId: number) {
    await this.prismaService.trackFavorites.delete({
      where: { userId_trackId: { trackId: id, userId } },
    });

    return;
  }
}
