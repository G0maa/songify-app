import { IsNumberString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumberString()
  trackId: string;
}
