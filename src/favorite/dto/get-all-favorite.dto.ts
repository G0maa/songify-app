import { IsNumberString, IsOptional } from 'class-validator';

export class GetAllFavoritesDto {
  @IsOptional()
  @IsNumberString()
  pageNumber?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
