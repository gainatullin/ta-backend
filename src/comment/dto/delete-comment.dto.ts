import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentDto {
  @ApiProperty({ example: 0, description: 'Comment id' })
  private id: number;
}
