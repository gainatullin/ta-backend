import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 0, description: 'Issue id' })
  readonly issueId: number;

  @ApiProperty({ example: 'string', description: 'Description' })
  readonly description: string;
}
