import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { ComponentService } from './component.service';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class ComponentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private projectUserRoleService: ProjectUserRoleService,
    private componentService: ComponentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const componentId = req.body.id;
    const component = await this.componentService.getByIdForGuard(componentId);

    if (!component) {
      new ErrorException({ message: 'Component not found', code: 'COMPONENT_NOT_FOUND' }).throwError();
    }
    const user = await this.projectUserRoleService.getOne(req.user.id, component.project.id);
    return roles.some((role) => role.includes(user.role));
  }
}
