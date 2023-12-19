import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { ApiResponseDto } from 'src/dto/api-response.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignOutDTO } from 'src/dto/sign-out.dto';
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
  ) {}

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */

  @Post('/login')
  public async login(
    @Body() login: LoginDto,
    @Res() res,
  ): Promise<ApiResponseDto> {
    try {
      const { username, password } = login;

      const dbUser = await this.db.user.findFirst({
        where: { name: username },
      });
      if (!dbUser) {
        return res
          .status(401)
          .send(new ApiResponseDto(null, true, 'Invalid username', null, 401));
      }

      const comparePassword = await this.comparePasswords(
        password,
        dbUser.password,
      );
      if (!comparePassword) {
        return res
          .status(401)
          .send(new ApiResponseDto(null, true, 'Invalid password', null, 401));
      }

      const { id, name } = dbUser;
      const payload = { userId: id, name };
      const token = await this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      // Set the token as a cookie
      res.cookie('token', token);

      // Sending the response
      return res
        .status(200)
        .send(
          new ApiResponseDto({ user: payload }, false, 'Logged In', null, 200),
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          new ApiResponseDto(null, true, 'Internal Server Error', null, 500),
        );
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                  SIGN OUT                                  */
  /* -------------------------------------------------------------------------- */
  @Post('signOut')
  public async signOut(
    @Response() res,
    @Body() body: SignOutDTO,
  ): Promise<ApiResponseDto> {
    try {
      const response = await this.authService.signOut(res, body);
      if (!response.isError) {
        res.clearCookie('token');
        return res.status(200).send(response);
      }
    } catch (error) {
      return new ApiResponseDto(null, true, 'Something Went Wrong', null, 500);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CREATE USER                                */
  /* -------------------------------------------------------------------------- */
  @Post('/createUser')
  public async createUser(
    @Body() createUser: CreateUserDto,
  ): Promise<ApiResponseDto> {
    return this.authService.createUser(createUser);
  }
}
