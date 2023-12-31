import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from 'src/interfaces/custom-request.interface';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET);
      if (payload && payload.name === 'admin') {
        req.user = payload;
        next();
      } else {
        throw new UnauthorizedException('Access denied: not an admin');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
