import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { CreateCommentDto, DeleteCommentDto, SearchCommentsDto, UpdateCommentDto } from './dto';
import { Comment } from './comment.entity';
import { CommentGuard } from './comment.guard';
import { Roles } from '../project/project-roles.decorator';
import { CommentIssueGuard } from './comment-issue.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @ApiOperation({ summary: 'Comment create' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(JwtAuthGuard, CommentIssueGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/create')
  create(@Body() dto: CreateCommentDto, @Req() req) {
    return this.commentService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Comments search' })
  @ApiResponse({ status: 200, type: [Comment] })
  @UseGuards(JwtAuthGuard, CommentIssueGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/search')
  search(@Body() dto: SearchCommentsDto) {
    return this.commentService.search(dto);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(JwtAuthGuard, CommentGuard)
  @Roles('ADMIN', 'WORKER')
  @Post('/update')
  update(@Body() dto: UpdateCommentDto) {
    return this.commentService.update(dto);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'WORKER')
  @Post('/remove')
  remove(@Body() dto: DeleteCommentDto) {
    return this.commentService.delete(dto);
  }
}
