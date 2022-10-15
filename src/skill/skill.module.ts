import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), AuthenticationModule],
  providers: [SkillService],
  controllers: [SkillController],
  exports: [SkillService],
})
export class SkillModule {}
