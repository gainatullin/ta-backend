import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(@InjectRepository(Link) private issueLinkRepository: Repository<Link>) {}

  async create(dto) {
    const link = await this.issueLinkRepository.save({
      sourceIssue: dto.sourceIssueId,
      targetIssue: dto.targetIssueId,
      linkType: dto.linkType,
    });

    return await this.getById(link.id);
  }

  async search(dto) {
    const [list, count] = await this.issueLinkRepository
      .createQueryBuilder('link')
      .where({ sourceIssue: { id: dto.issueId } })
      .leftJoinAndSelect('link.targetIssue', 'targetIssue')
      .leftJoinAndSelect('targetIssue.project', 'project')
      .leftJoinAndSelect('targetIssue.creator', 'creator')
      .leftJoinAndSelect('targetIssue.assignee', 'assignee')
      .leftJoinAndSelect('targetIssue.reporter', 'reporter')
      .leftJoinAndSelect('targetIssue.component', 'component')
      .getManyAndCount();

    return {
      list,
      count,
    };
  }

  async remove(dto) {
    try {
      await this.issueLinkRepository.delete(dto.id);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  async update(dto) {
    const link = await this.issueLinkRepository.save({ ...dto });
    return await this.getById(link.id);
  }

  async getById(id) {
    return await this.issueLinkRepository
      .createQueryBuilder('link')
      .where({ id: id })
      .leftJoinAndSelect('link.targetIssue', 'targetIssue')
      .leftJoinAndSelect('targetIssue.project', 'project')
      .leftJoinAndSelect('targetIssue.creator', 'creator')
      .leftJoinAndSelect('targetIssue.assignee', 'assignee')
      .leftJoinAndSelect('targetIssue.reporter', 'reporter')
      .leftJoinAndSelect('targetIssue.component', 'component')
      .getOne();
  }
}
