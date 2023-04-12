import { IsNotEmpty, IsInt, IsString } from 'class-validator';

// Note: This is passed by validate() in JWTStrategy
export class loggedInUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
