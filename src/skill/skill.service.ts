import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(@InjectRepository(Skill) private skillRepository: Repository<Skill>) {}

  async create(value) {
    await this.skillRepository.save({ value: value.toLowerCase() });
    return HttpStatus.OK;
  }

  async preloadSkill(value: string) {
    const alreadyExists = await this.skillRepository.findOneBy({ value: value.toLowerCase() });
    if (alreadyExists) {
      return;
    }
    return this.skillRepository.create({ value });
  }

  async search(dto: any) {
    return await this.skillRepository
      .createQueryBuilder('skill')
      .where('skill.value like :value', { value: `%${dto.value}%` })
      .getMany();
  }
}
