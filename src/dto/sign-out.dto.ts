/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class SignOutDTO {
  @IsNotEmpty()
  @IsString()
  username: string;
}
