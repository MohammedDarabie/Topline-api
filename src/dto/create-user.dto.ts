/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}
