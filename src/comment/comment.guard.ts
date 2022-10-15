import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { CommentService } from './comment.service';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private projectUserRoleService: ProjectUserRoleService,
    private commentService: CommentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const commentId = req.body.id;
    const comment = await this.commentService.getOneForGuard(commentId);

    if (!comment) {
      new ErrorException({ message: 'Comment not found', code: 'COMMENT_NOT_FOUND' }).throwError();
    }

    const user = await this.projectUserRoleService.getOne(req.user.id, comment.issue.project.id);
    return roles.some((role) => role.includes(user.role));
  }
}
