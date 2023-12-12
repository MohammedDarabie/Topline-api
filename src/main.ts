import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const allowedOrigins = [
  'http://localhost:3001',
  'https://topline-sa.netlify.app/',
  // Add other allowed origins if needed
];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      console.log('Origin', origin);
      // Check if the origin is in the list of allowed origins
      if (allowedOrigins.includes(origin) || !origin) {
        console.log('Success');
        callback(null, true);
      } else {
        console.log(origin);
        console.log('Error');
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
