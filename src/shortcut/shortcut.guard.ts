import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { ShortcutService } from './shortcut.service';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class ShortcutGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private projectUserRoleService: ProjectUserRoleService,
    private shortcutService: ShortcutService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const shortcutId = req.body.id;

    const shortcut = await this.shortcutService.getById(shortcutId);

    if (!shortcut) {
      new ErrorException({ message: 'Shortcut not found', code: 'SHORTCUT_NOT_FOUND' }).throwError();
    }

    const user = await this.projectUserRoleService.getOne(req.user.id, shortcut.project.id);
    return roles.some((role) => role.includes(user.role));
  }
}
