import { PickType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class SearchCommentsDto extends PickType(CreateCommentDto, ['issueId'] as const) {}
