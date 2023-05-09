import { IsNumber, IsPositive } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsPositive() // to-do issue #20: use a correct max value
  trackId: number;
}
