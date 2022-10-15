import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ example: 0, description: 'Comment id' })
  private id: number;

  @ApiProperty({ example: 'string', description: 'Description', required: false })
  private description: string;
}
