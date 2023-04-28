import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { MusicGenre } from 'src/types';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  q: string;

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
