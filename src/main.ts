import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ApiResponseDto } from './dto/api-response.dto';
import * as cookieParser from 'cookie-parser';
const allowedOrigins = [
  'http://localhost:3001',
  'https://topline-sa.netlify.app',
];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // console.log('Origin', origin);
      if (allowedOrigins.includes(origin) || !origin) {
        // console.log('Success');
        callback(null, true);
      } else {
        // console.log(origin);
        // console.log('Error');
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        const response = new ApiResponseDto(
          [],
          true,
          result[0].message,
          null,
          400,
        );
        return new BadRequestException(response);
      },
      stopAtFirstError: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
