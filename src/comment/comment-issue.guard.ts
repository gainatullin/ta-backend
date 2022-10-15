import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { ErrorException } from '../exceptions/error-exception';
import { IssueService } from '../issue/issue.service';

@Injectable()
export class CommentIssueGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private projectUserRoleService: ProjectUserRoleService,
    private issueService: IssueService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const issue = await this.issueService.getById({ id: req.body.issueId });

    if (!issue) new ErrorException({ message: 'Issue not found', code: 'ISSUE_NOT_FOUND' }).throwError();

    const user = await this.projectUserRoleService.getOne(req.user.id, issue.project.id);

    if (!user) new ErrorException({ message: 'Forbidden', code: 'FORBIDDEN' }).throwError();
    return roles.some((role) => role.includes(user.role));
  }
}
