import { ApiProperty } from '@nestjs/swagger';
import { IssueStatus } from '../issue.entity';

export class SearchIssuesDto {
  @ApiProperty({ example: 0, description: 'Project id', required: false })
  readonly projectId: number;

  @ApiProperty({ example: 'string', description: 'Issue name', required: false })
  readonly name: string;

  @ApiProperty({ example: [0], description: 'Assignee id', required: false })
  readonly assigneeId: number[];

  @ApiProperty({ example: [0], description: 'Reporter id', required: false })
  readonly reporterId: number[];

  @ApiProperty({ example: ['string'], description: 'Issue status', enum: IssueStatus, required: false })
  readonly status: string[];

  // @ApiProperty({ example: true, description: 'Issue is backlog', required: false })
  // readonly isBacklog: boolean;
}
