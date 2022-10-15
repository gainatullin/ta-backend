import { ApiProperty } from '@nestjs/swagger';
import { IssueStatus, IssuePriority, IssueType } from '../issue.entity';

export class CreateIssueDto {
  @ApiProperty({ example: 'string', description: 'Issue name' })
  readonly name: string;

  @ApiProperty({ example: 0, description: 'Project id' })
  readonly projectId: 0;

  @ApiProperty({ example: 'string', description: 'Issue description', required: false })
  readonly description: string;

  @ApiProperty({ example: 'string', description: 'Issue status', default: 'todo', enum: IssueStatus, required: false })
  readonly status: string;

  @ApiProperty({ example: 'string', description: 'Issue estimate', required: false })
  readonly estimate: string;

  @ApiProperty({ example: 0, description: 'Issue story points', required: false })
  readonly storyPoints: number;

  @ApiProperty({ example: false, description: 'Issue is backlog', default: false, required: false })
  readonly isBacklog: boolean;

  @ApiProperty({ example: 'string', description: 'Issue type', default: 'task', enum: IssueType, required: false })
  readonly type: string;

  @ApiProperty({ example: 0, description: 'Issue assignee id', required: false })
  readonly assigneeId: number;

  @ApiProperty({ example: 0, description: 'Issue reporter id', required: false })
  readonly reporterId: number;

  @ApiProperty({ example: 0, description: 'Project component id', required: false })
  readonly componentId: number;

  @ApiProperty({
    example: 'string',
    description: 'Issue priority',
    default: 'medium',
    enum: IssuePriority,
    required: false,
  })
  readonly priority: string;
}
