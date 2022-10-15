import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/project.entity';
import { GetIssueDto, SearchIssuesDto } from './dto';
import { Issue } from './issue.entity';
import { ErrorException } from '../exceptions/error-exception';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue) private issueRepository: Repository<Issue>,
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
    private notificationService: NotificationService,
  ) {}

  async create(dto, userId) {
    const project = await this.projectsRepository.findOneBy({ id: dto.projectId });

    const lastIssue = await this.issueRepository.findOne({
      where: { project: dto.projectId },
      order: { createdDate: 'DESC' },
    });

    const issueKey = Boolean(lastIssue) ? `${project.ticket}-${Number(lastIssue.id) + 1}` : `${project.ticket}-1`;

    const issue = await this.issueRepository.save({
      ...dto,
      name: dto.name,
      project: { id: project.id, name: project.name },
      key: issueKey,
      creator: userId,
      reporter: dto.reporterId ? dto.reporterId : userId,
      assignee: dto.assigneeId,
      component: dto.componentId,
    });

    if (dto.assigneeId) {
      await this.notificationService.create({
        message: `You have been assigned a task - ${issue.name}`,
        category: 'taskAssignee',
        userId: dto.assigneeId,
      });
    }

    if (dto.reporterId) {
      await this.notificationService.create({
        message: `You have been reported a task - ${issue.name}`,
        category: 'taskReported',
        userId: dto.reporterId,
      });
    }

    return await this.getById({ id: issue.id });
  }

  async search(dto: SearchIssuesDto) {
    const query = await this.issueRepository.createQueryBuilder('issue');

    if (dto.projectId) {
      query.andWhere({ project: dto.projectId });
    }

    if (dto.name) {
      query.andWhere('issue.name like :name', { name: `%${dto.name}%` });
    }

    if (dto.status) {
      query.andWhere('issue.status IN (:...status)', { status: dto.status });
    }

    if (dto.reporterId) {
      query.andWhere('issue.reporter IN (:...reporter)', { reporter: dto.reporterId });
    }

    if (dto.assigneeId) {
      query.andWhere('issue.assignee IN (:...assignee)', { assignee: dto.assigneeId });
    }

    const [list, count] = await query
      .select(['issue', 'project.id', 'project.name', 'project.ticket', 'creator.id', 'creator.name'])
      .leftJoin('issue.project', 'project')
      .leftJoinAndSelect('issue.creator', 'creator')
      .leftJoinAndSelect('issue.assignee', 'assignee')
      .leftJoinAndSelect('issue.reporter', 'reporter')
      .leftJoinAndSelect('issue.component', 'component')
      .getManyAndCount();

    return {
      list,
      count,
    };
  }

  async getById(dto) {
    if (!Object.keys(dto).length) {
      new ErrorException({ message: 'Empty request', code: 'EMPTY_REQUEST' }).throwError();
    }

    const query = await this.issueRepository.createQueryBuilder('issue');

    if (dto.id) {
      query.andWhere({ id: dto.id });
    }

    if (dto.key) {
      query.andWhere({ key: dto.key });
    }

    return query
      .select(['issue', 'project.id', 'project.name', 'project.ticket', 'creator.id', 'creator.name'])
      .leftJoin('issue.project', 'project')
      .leftJoin('issue.creator', 'creator')
      .leftJoinAndSelect('issue.assignee', 'assignee')
      .leftJoinAndSelect('issue.reporter', 'reporter')
      .leftJoinAndSelect('issue.component', 'component')
      .getOne();
  }

  async update(dto) {
    const issue = await this.issueRepository.findOneBy({ id: dto.id });

    await this.issueRepository.save({
      ...dto,
      reporter: dto.reporterId === null ? null : dto.reporterId || issue.reporter,
      assignee: dto.assigneeId === null ? null : dto.assigneeId || issue.assignee,
      component: dto.componentId === null ? null : dto.componentId || issue.component,
    });
    return await this.getById({ id: dto.id });
  }

  async remove(dto: GetIssueDto) {
    await this.issueRepository.delete(dto.id);
    return HttpStatus.OK;
  }
}
