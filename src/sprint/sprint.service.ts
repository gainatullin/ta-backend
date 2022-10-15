import { HttpStatus, Injectable } from '@nestjs/common';
import { Sprint } from './sprint.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SprintService {
  constructor(@InjectRepository(Sprint) private sprintRepository: Repository<Sprint>) {}

  async create(dto) {
    const sprint = await this.sprintRepository.save({ ...dto, project: dto.projectId });
    return await this.getById(sprint.id);
  }

  async search(dto) {
    const [list, count] = await this.sprintRepository.findAndCount({ where: { project: { id: dto.projectId } } });
    return {
      list,
      count,
    };
  }

  async update(dto) {
    await this.sprintRepository.save({ id: dto.id, ...dto });
    return this.getById(dto.id);
  }

  async delete(dto) {
    await this.sprintRepository.delete(dto.id);
    return HttpStatus.OK;
  }

  async getById(id) {
    return await this.sprintRepository.findOne({ where: { id }, relations: ['project'] });
  }
}
