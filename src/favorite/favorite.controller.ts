import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { GetAllFavoritesDto } from './dto/get-all-favorite.dto';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@ApiTags('favorite')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @GetUser('id') userId: number,
  ) {
    return this.favoriteService.create(createFavoriteDto, userId);
  }

  @Get()
  findAll(@Query() query: GetAllFavoritesDto, @GetUser('id') userId: number) {
    return this.favoriteService.findAll(query, userId);
  }

  // The current implementation is not RESTful
  // Better alternatives:
  // /you/favorites/1
  // /user/1/favorites/1
  // this doesn't have {id} in the path
  // because we're providing trackId not 'favorite'Id
  @Delete()
  remove(@Query() query: DeleteFavoriteDto, @GetUser('id') userId: number) {
    return this.favoriteService.remove(+query.trackId, userId);
  }
}
