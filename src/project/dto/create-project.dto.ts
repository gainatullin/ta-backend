import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'string', description: 'Project name' })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Project ticket' })
  readonly ticket: string;

  @ApiProperty({ example: 0, description: 'Workspace id' })
  readonly workspaceId: number;

  @ApiProperty({ example: 'string', description: 'Project description', required: false })
  readonly description: string;

  @ApiProperty({ example: 0, description: 'Project lead', required: false })
  readonly leadId: number;

  readonly userId: number;
}
