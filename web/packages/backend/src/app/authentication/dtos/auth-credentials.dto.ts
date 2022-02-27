import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username?: string;

  @IsString()
  @MinLength(4, { message: 'Password is too short (4 characters min)' })
  @MaxLength(40, { message: 'Password is too long (20 characters max)' })
  password?: string;
}
