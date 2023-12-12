import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicantModule } from './applicant/applicant.module';

@Module({
  imports: [DatabaseModule, ApplicantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
