import { IsNumberString, IsOptional } from 'class-validator';

export class GetHistoryDto {
  @IsOptional()
  @IsNumberString()
  pageNumber?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
