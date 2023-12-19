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

    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload) {
        req.user = payload;
        console.log('req.user', req.user);
        next();
      } // Add user info to request object
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
