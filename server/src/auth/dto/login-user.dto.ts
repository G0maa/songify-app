import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  password: string;
}
