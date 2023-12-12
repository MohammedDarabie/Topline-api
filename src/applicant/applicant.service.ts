import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/common/api-response.dto';
import { createApplicantDto } from 'src/common/create-applicant.dto';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class ApplicantService {
  constructor(private readonly db: DatabaseService) {}

  public async getUsers() {
    return 'Hello World';
  }

  public async createUser(user: createApplicantDto): Promise<ApiResponseDto> {
    console.log(user);
    const createdUser = await this.db.applicant.create({
      data: user,
    });
    return new ApiResponseDto(
      createdUser,
      false,
      'Successfully Created',
      null,
      201,
    );
  }
}
