import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class GetTrackDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  id: string;
}
