import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';

@Injectable()
export class ProjectRolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private projectUserRoleService: ProjectUserRoleService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const projectId = req.body.id || req.body.projectId;
    if (projectId) {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      const user = await this.projectUserRoleService.getOne(req.user.id, projectId);

      return roles.some((role) => role.includes(user.role));
    }

    return true;
  }
}
