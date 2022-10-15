import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';
import { IssueModule } from '../issue/issue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthenticationModule, ProjectUserRoleModule, IssueModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
