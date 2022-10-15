import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectUserRole } from './project-user-role.entity';
import { Repository } from 'typeorm';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class ProjectUserRoleService {
  constructor(@InjectRepository(ProjectUserRole) private projectUserRoleRepository: Repository<ProjectUserRole>) {}

  async create(dto) {
    return await this.projectUserRoleRepository.save(dto);
  }

  async getById(dto) {
    return await this.projectUserRoleRepository.findOne({
      where: { project: { id: dto.projectId }, user: { id: dto.userId } },
    });
  }

  async search(dto) {
    const [list, count] = await this.projectUserRoleRepository.findAndCount({
      where: { project: { id: dto.id } },
      relations: ['user'],
    });

    const newList = list.map((item) => ({
      ...item.user,
      role: item.role,
    }));

    return {
      list: newList,
      count,
    };
  }

  async getOne(userId: number, projectId: number) {
    return await this.projectUserRoleRepository.findOne({
      where: { user: { id: userId }, project: { id: projectId } },
    });
  }

  async update(dto) {
    const user = await this.projectUserRoleRepository.findOne({
      where: { project: { id: dto.projectId }, user: { id: dto.userId } },
    });

    if (!user) {
      new ErrorException({ message: 'User not found', code: 'USER_NOT_FOUND' }).throwError();
    }

    await this.projectUserRoleRepository.save({ ...user, role: dto.role });
  }

  async delete(dto) {
    const user = await this.projectUserRoleRepository.findOne({
      where: { project: { id: dto.projectId }, user: { id: dto.userId } },
    });

    await this.projectUserRoleRepository.remove(user);
    return HttpStatus.OK;
  }

  async searchProjects(id) {
    const [list, count] = await this.projectUserRoleRepository
      .createQueryBuilder('projectUserRoleRepository')
      .where({ user: { id: id } })
      .leftJoinAndSelect('projectUserRoleRepository.project', 'project')
      .leftJoinAndSelect('project.workspace', 'workspace')
      .leftJoinAndSelect('project.creator', 'creator')
      .leftJoinAndSelect('project.lead', 'lead')
      .getManyAndCount();

    const newList = list.map((item) => ({
      ...item.project,
      role: item.role,
    }));

    return {
      list: newList,
      count,
    };
  }
  async getWorkspaceUsers(id) {
    const [list, count] = await this.projectUserRoleRepository
      .createQueryBuilder('projectUserRoleRepository')
      .leftJoinAndSelect('projectUserRoleRepository.user', 'user')
      .leftJoinAndSelect('projectUserRoleRepository.project', 'project')
      .leftJoinAndSelect('project.workspace', 'workspace')
      .where('workspace.id = :id', { id: id })
      // .groupBy('user.id')
      .getManyAndCount();

    const newList = list.map((item) => ({
      ...item.user,
      role: item.role,
    }));

    return {
      list: newList,
      count: newList.length,
    };
  }

  async getForProject(dto, userId) {
    if (!Object.keys(dto).length) {
      new ErrorException({ message: 'Empty request', code: 'EMPTY_REQUEST' }).throwError();
    }

    const project = await this.projectUserRoleRepository
      .createQueryBuilder('projectUserRole')
      .where({ user: { id: userId } });

    if (dto.id) {
      await project.andWhere('project.id =:id', { id: dto.id });
    }

    if (dto.ticket) {
      await project.andWhere('project.ticket = :ticket', { ticket: dto.ticket.toLowerCase() });
    }

    const newProject = await project
      .leftJoinAndSelect('projectUserRole.project', 'project')
      .leftJoinAndSelect('project.workspace', 'workspace')
      .leftJoinAndSelect('project.creator', 'creator')
      .leftJoinAndSelect('project.lead', 'lead')
      .getOne();

    if (!newProject) {
      new ErrorException({ message: 'Project not found', code: 'PROJECT_NOT_FOUND' }).throwError();
    }

    return { ...newProject.project, role: newProject.role };
  }
}
