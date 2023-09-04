import { IsNumberString } from 'class-validator';

export class DeleteFavoriteDto {
  @IsNumberString()
  trackId: string;
}
