import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from 'src/dto/api-response.dto';
import { createApplicantDto } from 'src/dto/create-applicant.dto';
import { DatabaseService } from 'src/database/database.service';
import { UdateUserInfoDto } from '../dto/updating.dto';
@Injectable()
export class ApplicantService {
  constructor(private readonly db: DatabaseService) {}

  public async getUsers(): Promise<ApiResponseDto> {
    const users = await this.db.applicant.findMany();

    return new ApiResponseDto(users, false, 'Users', null, 200);
  }

  public async createUser(user: createApplicantDto): Promise<ApiResponseDto> {
    // console.log(user);
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
  /* ------------------------------ Get undecided ----------------------------- */
  public async getUndecided(): Promise<ApiResponseDto> {
    try {
      const response = await this.db.applicant.findMany({
        where: { applicationStatus: 'NOT_DECIDED' },
      });
      if (response.length === 0) {
        return new ApiResponseDto(
          null,
          false,
          'No undecided Applicants Found',
          null,
          404,
        );
      }

      return new ApiResponseDto(
        response,
        false,
        'Succesfully Got Users',
        null,
        200,
      );
    } catch (error) {
      console.log(error);
      return new ApiResponseDto(null, true, 'Something went wrong', null, 500);
    }
  }
  /* ------------------------------ Get Accepted ------------------------------ */
  public async getAccepted(): Promise<ApiResponseDto> {
    try {
      const response = await this.db.applicant.findMany({
        where: { applicationStatus: 'ACCEPTED' },
      });
      if (response.length === 0) {
        return new ApiResponseDto(
          null,
          false,
          'No accepted Applicants Found',
          null,
          404,
        );
      }

      return new ApiResponseDto(
        response,
        false,
        'Succesfully Got Users',
        null,
        200,
      );
    } catch (error) {
      console.log(error);
      return new ApiResponseDto(null, true, 'Something went wrong', null, 500);
    }
  }
  /* ------------------------------ Get Rejected ------------------------------ */
  public async getRejected(): Promise<ApiResponseDto> {
    try {
      const response = await this.db.applicant.findMany({
        where: { applicationStatus: 'REJECTED' },
      });
      if (response.length === 0) {
        return new ApiResponseDto(
          null,
          false,
          'No rejected Applicants Found',
          null,
          404,
        );
      }

      return new ApiResponseDto(
        response,
        false,
        'Succesfully Got Users',
        null,
        200,
      );
    } catch (error) {
      console.log(error);
      return new ApiResponseDto(null, true, 'Something went wrong', null, 500);
    }
  }
  /* ------------------------------- Update User to undecided ------------------------------ */
  public async updateStatustoUndecided(
    user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    const response = await this.db.applicant.update({
      where: { id: user.id },
      data: { applicationStatus: 'NOT_DECIDED' },
    });
    return new ApiResponseDto(response, false, 'Rejected!', null, 200);
  }
  /* --------------------------- Update to accepted --------------------------- */
  public async updateStatustoReject(
    user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    // console.log(user.id);
    const response = await this.db.applicant.update({
      where: { id: user.id },
      data: { applicationStatus: 'REJECTED' },
    });
    return new ApiResponseDto(response, false, 'Rejected!', null, 200);
  }
  /* --------------------------- Update to Rejected --------------------------- */
  public async updateStatustoAccept(
    user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    const response = await this.db.applicant.update({
      where: { id: user.id },
      data: { applicationStatus: 'ACCEPTED' },
    });
    return new ApiResponseDto(response, false, 'Rejected!', null, 200);
  }
  /* ------------------------------- Delete User ------------------------------ */
  public async deleteApplicant(
    user: UdateUserInfoDto,
  ): Promise<ApiResponseDto> {
    // console.log(user);
    const response = await this.db.applicant.findFirst({
      where: { id: user.id },
    });
    if (!response) {
      return new ApiResponseDto(null, false, 'No User Found', null, 401);
    } else {
      try {
        const response = await this.db.applicant.delete({
          where: { id: user.id },
        });

        return new ApiResponseDto(response, false, 'User Deleted', null, 401);
      } catch (error) {
        return new ApiResponseDto(null, false, 'No User Found', null, 401);
      }
    }
  }
}
