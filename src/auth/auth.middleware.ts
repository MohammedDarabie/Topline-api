import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from 'src/interfaces/custom-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    console.log('token', token);
    console.log(req);
    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
      if (payload) {
        req.user = payload;
        console.log('req.user', req.user);
        next();
      }
    });
  }
}
