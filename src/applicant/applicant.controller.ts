import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { createApplicantDto } from 'src/common/create-applicant.dto';
import { ApiResponseDto } from 'src/common/api-response.dto';

@Controller('api/applicant')
export class ApplicantController {
  constructor(private readonly service: ApplicantService) {}

  @Get()
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
