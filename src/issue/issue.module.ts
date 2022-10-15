import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Project } from '../project/project.entity';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, Project]),
    AuthenticationModule,
    ProjectUserRoleModule,
    NotificationModule,
  ],
  providers: [IssueService],
  controllers: [IssueController],
  exports: [IssueService],
})
export class IssueModule {}
