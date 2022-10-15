import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IssueService } from './issue.service';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class IssueGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private issueService: IssueService,
    private projectUserRoleService: ProjectUserRoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const issue = await this.issueService.getById({ id: req.body.id });

    if (!issue) {
      new ErrorException({ message: 'Issue not found', code: 'ISSUE_NOT_FOUND' }).throwError();
    }

    const user = await this.projectUserRoleService.getOne(req.user.id, issue.project.id);

    return roles.some((role) => role.includes(user.role));
  }
}
