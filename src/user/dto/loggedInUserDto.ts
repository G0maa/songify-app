import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class loggedInUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
