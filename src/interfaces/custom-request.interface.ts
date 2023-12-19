/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface CustomRequest extends Request {
  user: any; // Define the type of 'user' as per your needs, preferably a more specific type or interface
}
