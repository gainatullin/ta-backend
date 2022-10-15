import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ResumeModule } from './resume/resume.module';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
import { SkillModule } from './skill/skill.module';
import { ComponentModule } from './component/component.module';
import { FileModule } from './file/file.module';
import { ShortcutModule } from './shortcut/shortcut.module';
import { InvitationModule } from './invitation/invitation.module';
import { CommentModule } from './comment/comment.module';
import { ProjectUserRoleModule } from './project-user-role/project-user-role.module';
import { DocumentModule } from './document/document.module';
import { AppDataSource } from './orm.config';
import { SprintModule } from './sprint/sprint.module';
import { LinkModule } from './link/link.module';
import { NotificationModule } from './notification/notification.module';
import { MailModule } from './mail/mail.module';

@Module({
  controllers: [],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({ ...AppDataSource.options }),
    UserModule,
    WorkspaceModule,
    AuthenticationModule,
    ResumeModule,
    ProjectModule,
    IssueModule,
    SkillModule,
    ComponentModule,
    FileModule,
    ShortcutModule,
    InvitationModule,
    CommentModule,
    ProjectUserRoleModule,
    DocumentModule,
    SprintModule,
    LinkModule,
    NotificationModule,
    MailModule,
  ],
})
export class AppModule {}
