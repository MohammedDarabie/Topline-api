/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class UdateUserInfoDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
