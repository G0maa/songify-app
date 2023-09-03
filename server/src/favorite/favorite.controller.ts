import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { GetAllFavoritesDto } from './dto/get-all-favorite.dto';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@ApiTags('Favorite')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller({
  path: 'favorite',
  version: '1',
})
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Favorite record created' })
  @ApiUnauthorizedResponse({ description: 'User unauthenticated' })
  @ApiBadRequestResponse({ description: 'Invalid request body' }) // to-do issue #20
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @GetUser('id') userId: number,
  ) {
    return this.favoriteService.create(createFavoriteDto, userId);
  }

  @Get()
  @ApiBadRequestResponse({ description: 'Invalid query' }) // to-do issue #20
  @ApiOkResponse({ description: 'Returns Favorite array' })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({ description: 'Invalid query' }) // to-do issue #20
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiNoContentResponse({ description: 'Favorite record deleted' })
  remove(@Query() query: DeleteFavoriteDto, @GetUser('id') userId: number) {
    return this.favoriteService.remove(+query.trackId, userId);
  }
}
