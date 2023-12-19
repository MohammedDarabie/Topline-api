import { Body, Injectable, Response } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ApiResponseDto } from 'src/dto/api-response.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignOutDTO } from 'src/dto/sign-out.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
  /* -------------------------------- Sign Out -------------------------------- */
  public async signOut(
    @Response() res,
    @Body() body: SignOutDTO,
  ): Promise<ApiResponseDto> {
    const { username } = body;
    const dbUser = await this.db.user.findFirst({
      where: { name: username },
    });
    if (!dbUser) {
      return res
        .status(404)
        .send(
          new ApiResponseDto(
            null,
            true,
            'No User Was Found LoggedIn',
            null,
            404,
          ),
        );
    }

    return new ApiResponseDto(
      null,
      false,
      'Successfully Logged Out',
      { username },
      200,
    );
  }
  /* ----------------------------- // Create User ----------------------------- */
  public async createUser(createUser: CreateUserDto): Promise<ApiResponseDto> {
    const { username, password } = createUser;
    const hashedPassword = await this.hashPassword(password);

    const dbUser = await this.db.user.findFirst({ where: { name: username } });
    if (dbUser) {
      return new ApiResponseDto(null, true, 'UserAlready existing', null, 403);
    }
    const createdUser = await this.db.user.create({
      data: { name: username, password: hashedPassword },
    });

    return new ApiResponseDto(createdUser, false, 'Success', null, 200);
  }
}
