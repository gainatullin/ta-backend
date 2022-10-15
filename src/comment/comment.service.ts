import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  async create(dto, creatorId) {
    const comment = await this.commentRepository.save({ ...dto, issue: dto.issueId, creator: creatorId });
    return await this.getById(comment.id);
  }

  async getById(id) {
    return await this.commentRepository.findOne({ where: { id: id }, relations: ['creator'] });
  }

  async search(dto) {
    return [];
    // const [list, count] = await this.commentRepository.findAndCount({
    //   where: { issue: { id: dto.issueId } },
    //   relations: ['creator'],
    // });
    // return {
    //   list,
    //   count,
    // };
  }

  async update(dto) {
    await this.commentRepository.save({ ...dto });
    return await this.getById(dto.id);
  }

  async delete(dto) {
    await this.commentRepository.delete(dto.id);
    return HttpStatus.OK;
  }

  async getOneForGuard(id) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .where({ id: id })
      .leftJoinAndSelect('comment.issue', 'issue')
      .leftJoinAndSelect('issue.project', 'project')
      .getOne();
  }
}
