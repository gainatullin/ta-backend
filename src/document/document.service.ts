import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';
import { ErrorException } from '../exceptions/error-exception';

@Injectable()
export class DocumentService {
  constructor(@InjectRepository(Document) private documentRepository: Repository<Document>) {}

  async create(dto, creatorId) {
    const document = await this.documentRepository.save({ ...dto, project: dto.projectId, creator: creatorId });
    return await this.getById(document.id);
  }

  async update(dto) {
    await this.documentRepository.save({ ...dto });
    return await this.getById(dto.id);
  }

  async getById(id) {
    return await this.documentRepository.findOne({ where: { id: id }, relations: ['creator'] });
  }

  async getOneForGuard(id) {
    return await this.documentRepository.findOne({ where: { id: id }, relations: ['project'] });
  }

  async search(dto) {
    const [list, count] = await this.documentRepository.findAndCount({
      where: { project: { id: dto.projectId } },
      relations: ['creator'],
    });

    return {
      list,
      count,
    };
  }

  async remove(dto) {
    if (!Object.keys(dto).length) {
      new ErrorException({ message: 'Empty request', code: 'EMPTY_REQUEST' }).throwError();
    }
    await this.documentRepository.delete(dto.id);
    return HttpStatus.OK;
  }
}
