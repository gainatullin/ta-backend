import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentService } from './document.service';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class DocumentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private documentService: DocumentService,
    private projectUserRoleService: ProjectUserRoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const documentId = req.body.id;
    const document = await this.documentService.getOneForGuard(documentId);

    if (!document) {
      new ErrorException({ message: 'Document not found', code: 'DOCUMENT_NOT_FOUND' }).throwError();
    }

    const user = await this.projectUserRoleService.getOne(req.user.id, document.project.id);
    return roles.some((role) => role.includes(user.role));
  }
}
