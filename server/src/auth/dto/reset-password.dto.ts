import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  newPassword: string;
}
