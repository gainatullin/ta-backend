import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { WorkspaceService } from '../workspace/workspace.service';
import { ErrorException } from '../exceptions/error-exception';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private workspaceService: WorkspaceService,
    private userService: UserService,
    private fileService: FileService,
    private projectUserRoleService: ProjectUserRoleService,
    private notificationService: NotificationService,
  ) {}

  async create(dto) {
    const workspace = await this.workspaceService.getForProjectCreate(dto.workspaceId); // TODO create guard to check workspace;
    const user = await this.userService.getForProjectCreate(dto.creatorId);

    if (!workspace) {
      new ErrorException({ message: 'Workspace not found', code: 'WORKSPACE_NOT_FOUND' }).throwError();
    }

    const project = await this.projectRepository.save({
      ...dto,
      ticket: dto.ticket.toUpperCase(),
      workspace: workspace.id,
      creator: dto.creatorId,
      lead: dto.leadId,
      users: [user],
    });

    await this.projectUserRoleService.create({ project: project.id, user: user.id, role: 'ADMIN' });
    return await this.getByID({ id: project.id }, user.id);
  }

  async getByID(dto, userId?: any) {
    return await this.projectUserRoleService.getForProject(dto, userId);
  }

  async search(userId) {
    return await this.projectUserRoleService.searchProjects(userId);
  }

  async remove(dto, ownerId) {
    const project = await this.getByID({ id: dto.id }, ownerId);

    if (project.creator.id !== ownerId) {
      new ErrorException({ message: 'Forbidden', code: 'FORBIDDEN' }).throwError();
    }

    await this.projectRepository.remove(project);
    return HttpStatus.OK;
  }

  async update(dto, userId) {
    const project = await this.getByID({ id: dto.id });

    if (!project) {
      new ErrorException({ message: 'Project not found', code: 'PROJECT_NOT_FOUND' }).throwError();
    }

    if (project.creator.id !== userId) {
      new ErrorException({ message: 'Forbidden', code: 'FORBIDDEN' }).throwError();
    }

    const updatedProject = await this.projectRepository.save({
      id: project.id,
      ...project,
      ...dto,
      lead: dto.leadId || project.lead,
    });

    return await this.getByID({ id: updatedProject.id });
  }

  async getForComponent(id: number) {
    return await this.projectRepository.findOneBy({ id: id });
  }

  async addUser(dto) {
    const project = await this.projectRepository.findOne({ where: { id: dto.id } });

    if (!project) {
      new ErrorException({ message: 'Project not found', code: 'PROJECT_NOT_FOUND' }).throwError();
    }

    const user = await this.userService.getForProjectCreate(dto.userId);

    if (!user) {
      new ErrorException({ message: 'User not found', code: 'USER_NOT_FOUND' }).throwError();
    }

    const isAlreadyExistsInProject = await this.projectUserRoleService.getById(dto);
    if (isAlreadyExistsInProject) {
      new ErrorException({ message: 'User already exists in this project', code: 'ALREADY_EXISTS' }).throwError();
    }

    await this.projectUserRoleService.create({ project: project.id, user: user.id, role: dto.role || 'WORKER' });
    await this.notificationService.create({
      message: `You have been added to "${project.name}" project`,
      category: 'addToProject',
      userId: user.id,
    });
    return HttpStatus.OK;
  }

  async removeUser(dto) {
    const project = await this.projectRepository.findOne({ where: { id: dto.id } });

    if (!project) {
      new ErrorException({ message: 'Project not found', code: 'PROJECT_NOT_FOUND' }).throwError();
    }

    const user = await this.userService.getForProjectCreate(dto.userId);

    if (!user) {
      new ErrorException({ message: 'User not found', code: 'USER_NOT_FOUND' }).throwError();
    }

    return await this.projectUserRoleService.delete(dto);
  }

  async updateUser(dto) {
    await this.projectUserRoleService.update(dto);
    return HttpStatus.OK;
  }

  async searchUsers(dto) {
    return await this.projectUserRoleService.search(dto);
  }

  async upload(avatar, id) {
    return await this.fileService.upload(avatar, id, 'projects');
  }

  async downloadAvatar(id, res) {
    return await this.fileService.download(id, res, 'projects');
  }
}
