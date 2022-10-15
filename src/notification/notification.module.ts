import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NotificationGateway } from './notification.gateway';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  imports: [TypeOrmModule.forFeature([Notification]), AuthenticationModule],
  exports: [NotificationService],
})
export class NotificationModule {}
