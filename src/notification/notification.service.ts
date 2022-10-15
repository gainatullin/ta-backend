import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {}

  async create(dto) {
    await this.notificationRepository.save({ ...dto, user: dto.userId });
  }

  async search(userId) {
    const [list, count] = await this.notificationRepository.findAndCount({ where: { user: { id: userId } } });

    return {
      list,
      count,
    };
  }
}
