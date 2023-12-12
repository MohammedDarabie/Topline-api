/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class createApplicantDto {
  // @IsNotEmpty()
  // @IsString()
  name: string;

  // @IsNotEmpty()
  // @IsString()
  dateOfBirth: string;

  // @IsNotEmpty()
  // @IsString()
  nationality: string;

  // @IsNotEmpty()
  // @IsString()
  cityOfResidence: string;

  // @IsNotEmpty()
  // @IsString()
  phoneNumber: string;
  // @IsNotEmpty()
  // @IsString()
  pastWorkBrief: string;
  // @IsNotEmpty()
  // @IsString()
  profilePicLink: string;
}
