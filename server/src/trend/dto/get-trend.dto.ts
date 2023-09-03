import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { MusicGenre } from 'src/types';

export class GetTrendDto {
  @IsOptional()
  @IsEnum(MusicGenre)
  genre?: MusicGenre;

  @IsOptional()
  @IsNumberString()
  pageNumber?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
