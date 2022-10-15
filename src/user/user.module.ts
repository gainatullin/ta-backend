import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Resume } from '../resume/resume.entity';
import { Project } from '../project/project.entity';
import { Issue } from '../issue/issue.entity';
import { FileModule } from '../file/file.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Resume, Project, Issue]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => AuthenticationModule),
    FileModule,
    MailModule,
  ],
  exports: [UserService],
})
export class UserModule {}
