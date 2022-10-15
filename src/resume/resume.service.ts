import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './resume.entity';
import { Repository } from 'typeorm';
import { ErrorException } from '../exceptions/error-exception';
import { SkillService } from '../skill/skill.service';
import { CreateResumeDto, GetResumeDto, RemoveResumeDto } from './dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
    private skillService: SkillService,
  ) {}

  async create(dto: CreateResumeDto, creatorId) {
    const skills =
      dto.skills && (await Promise.all(dto.skills.map((skill: any) => this.skillService.preloadSkill(skill))));

    const resume = this.resumeRepository.create({
      ...dto,
      skills: skills,
    });

    const savedResume = await this.resumeRepository.save({ ...resume, creator: creatorId });
    return await this.get({ creatorId: savedResume.id });
  }

  async get(dto: GetResumeDto) {
    if (!Object.keys(dto).length) {
      new ErrorException({ message: 'Empty request', code: 'EMPTY_REQUEST' }).throwError();
    }
    return await this.resumeRepository.findOne({
      where: { creator: { id: dto.creatorId } },
      relations: ['skills', 'creator'],
    });
  }

  async remove(dto: RemoveResumeDto, ownerId) {
    const resume = await this.resumeRepository.findOneBy({ id: dto.id });

    if (!resume) {
      new ErrorException({ message: 'Resume not found', code: 'RESUME_NOT_FOUND' }).throwError();
    }

    if (resume.creator.id !== ownerId) {
      new ErrorException({ message: 'Forbidden', code: 'FORBIDDEN' }).throwError();
    }

    await this.resumeRepository.remove(resume);
    return HttpStatus.OK;
  }
}
