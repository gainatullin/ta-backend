import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(private workspaceService: WorkspaceService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();

    const workspaceId = req.body.id;
    const workspace = await this.workspaceService.getById({ id: workspaceId });

    if (!workspace) {
      new ErrorException({ message: 'Workspace not found', code: 'WORKSPACE_NOT_FOUND' }).throwError();
    }

    return workspace.creator.id === req.user.id;
  }
}
