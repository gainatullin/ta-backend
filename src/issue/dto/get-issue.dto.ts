import { ApiProperty } from '@nestjs/swagger';

export class GetIssueDto {
  @ApiProperty({ example: 0, description: 'Issue id', required: false })
  id: number;

  @ApiProperty({ example: 'string', description: 'Issue key', required: false })
  key: string;
}
