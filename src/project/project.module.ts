import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    AuthenticationModule,
    WorkspaceModule,
    UserModule,
    FileModule,
    ProjectUserRoleModule,
    NotificationModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
