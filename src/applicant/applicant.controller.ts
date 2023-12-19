import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { createApplicantDto } from 'src/dto/create-applicant.dto';
import { ApiResponseDto } from 'src/dto/api-response.dto';
import { AuthMiddleware } from 'src/auth/auth.middleware';

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
}
