import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender, MusicGenre } from 'src/types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

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

  @IsOptional()
  @IsString()
  @MaxLength(32)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  lastName?: string;

  // to-do move enums to a separate file, e.g. types.ts
  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  gender?: Gender;

  // Note: I do the transofrmation to Date auth.service.ts
  @IsOptional()
  @IsDateString()
  birthDate?: string | Date;

  // to-do make this an enum
  @IsOptional()
  @IsEnum(MusicGenre)
  favoriteGenre?: MusicGenre;
}
