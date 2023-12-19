import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicantModule } from './applicant/applicant.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { AdminAuthMiddleware } from './admin-auth/admin-auth.middleware';
@Module({
  imports: [DatabaseModule, ApplicantModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/applicant', method: RequestMethod.GET });
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes({ path: 'api/auth/createUser', method: RequestMethod.POST });
  }
}
