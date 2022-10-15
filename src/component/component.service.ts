import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './component.entity';
import { Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { ErrorException } from '../exceptions/error-exception';
import { DeleteComponentDto, SearchComponentDto } from './dto';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component) private componentRepository: Repository<Component>,
    private projectService: ProjectService,
  ) {}

  async create(dto) {
    const project = await this.projectService.getForComponent(dto.projectId);

    if (!project) {
      new ErrorException({ message: 'Project not found', code: 'PROJECT_NOT_FOUND' }).throwError();
    }
    const component = await this.componentRepository.save({ ...dto, project: dto.projectId, lead: dto.leadId });
    return this.getById(component.id);
  }

  async delete(dto: DeleteComponentDto) {
    await this.componentRepository.delete(dto.id);
    return HttpStatus.OK;
  }

  async search(dto: SearchComponentDto) {
    const [list, count] = await this.componentRepository
      .createQueryBuilder('component')
      .where({ project: { id: dto.projectId } })
      .leftJoinAndSelect('component.lead', 'lead')
      .loadRelationCountAndMap('component.issuesCount', 'component.issue', 'issue')
      .getManyAndCount();

    return {
      list,
      count,
    };
  }

  async update(dto) {
    const component = await this.componentRepository.findOneBy({ id: dto.id });

    const updatedComponent = await this.componentRepository.save({
      ...dto,
      lead: dto.leadId || component.lead,
    });
    return this.getById(updatedComponent.id);
  }

  async getById(id) {
    return await this.componentRepository.findOne({ where: { id: id }, relations: ['lead'] });
  }

  async getByIdForGuard(id: number) {
    return await this.componentRepository.findOne({ where: { id: id }, relations: ['project'] });
  }
}
