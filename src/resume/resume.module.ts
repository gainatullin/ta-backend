import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './resume.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), AuthenticationModule, SkillModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
