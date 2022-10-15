import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Search notifications' })
  @ApiResponse({ status: 200, type: Notification })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Req() req) {
    return this.notificationService.search(req.user.id);
  }
}
