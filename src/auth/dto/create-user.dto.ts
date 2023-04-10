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
  @IsEnum({ Male: 'Male', Female: 'Female' })
  gender?: string;

  @IsOptional()
  @IsDateString()
  DateOfBirth?: string;

  // to-do make this an enum
  @IsOptional()
  @IsEnum({})
  favouriteGenre?: string;
}
