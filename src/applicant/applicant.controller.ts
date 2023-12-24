import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { createApplicantDto } from 'src/dto/create-applicant.dto';
import { ApiResponseDto } from 'src/dto/api-response.dto';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { UdateUserInfoDto } from '../dto/updating.dto';

@Controller('api/applicant')
export class ApplicantController {
  constructor(private readonly service: ApplicantService) {}

  @Get()
  @UseGuards(AuthMiddleware)
  public async getUsers() {
    return this.service.getUsers();
  }

  @Post()
  public async createApplicant(
    @Body() user: createApplicantDto,
  ): Promise<ApiResponseDto> {
    return this.service.createUser(user);
  }
  /* -------------------------------------------------------------------------- */
  /*                          GET UNDECIDED APPLICANTS                          */
  /* -------------------------------------------------------------------------- */
  @Get('/undecided')
  @UseGuards(AuthMiddleware)
  public async getNonDecided(): Promise<ApiResponseDto> {
    return this.service.getUndecided();
  }

  /* -------------------------------------------------------------------------- */
  /*                          GET Accepted APPLICANTS                          */
  /* -------------------------------------------------------------------------- */
  @Get('/accepted')
  @UseGuards(AuthMiddleware)
  public async getAccepted(): Promise<ApiResponseDto> {
    return this.service.getAccepted();
  }
  /* -------------------------------------------------------------------------- */
  /*                          GET Rejected APPLICANTS                          */
  /* -------------------------------------------------------------------------- */
  @Get('/rejected')
  @UseGuards(AuthMiddleware)
  public async getRejected(): Promise<ApiResponseDto> {
    return this.service.getRejected();
  }
  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE Undecided                                   */
  /* -------------------------------------------------------------------------- */
  @Post('/updateundecided')
  public async updateStatustoUndecided(
    @Body() user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    return this.service.updateStatustoUndecided(user);
  }
  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE Accepted                                   */
  /* -------------------------------------------------------------------------- */
  @Post('/updatereject')
  public async updateStatustoReject(
    @Body() user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    return this.service.updateStatustoReject(user);
  }
  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE  Rejected                                 */
  /* -------------------------------------------------------------------------- */
  @Post('/updateaccept')
  public async updateStatustoAccept(
    @Body() user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    return this.service.updateStatustoAccept(user);
  }
  /* -------------------------------------------------------------------------- */
  /*                                 DELETE USER                                */
  /* -------------------------------------------------------------------------- */
  @Delete('/deleteapplicant')
  public async deleteApplicant(
    @Body() user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    return this.service.deleteApplicant(user);
  }
}
