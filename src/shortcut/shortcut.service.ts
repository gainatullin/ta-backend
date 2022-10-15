import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shortcut } from './shortcut.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortcutService {
  constructor(@InjectRepository(Shortcut) private shortcutRepository: Repository<Shortcut>) {}

  async create(dto) {
    const shortcut = await this.shortcutRepository.save({ ...dto, project: dto.projectId });
    return await this.getById(shortcut.id);
  }

  async remove(dto) {
    await this.shortcutRepository.delete(dto.id);
    return HttpStatus.OK;
  }

  async search(dto) {
    const query = await this.shortcutRepository.createQueryBuilder('shortcut');

    if (dto.projectId) {
      query.andWhere({ project: dto.projectId });
    }

    const [list, count] = await query.getManyAndCount();

    return {
      list,
      count,
    };
  }

  async update(dto) {
    await this.shortcutRepository.save({ ...dto });
    return await this.getById(dto.id);
  }

  async getById(id) {
    return await this.shortcutRepository.findOne({
      where: { id: id },
      relations: ['project'],
      select: { project: { id: true, name: true, ticket: true } },
    });
  }
}
