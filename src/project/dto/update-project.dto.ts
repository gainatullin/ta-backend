import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Project name', required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Project ticket', required: false })
  readonly ticket: string;

  @ApiProperty({ example: 'string', description: 'Project description', required: false })
  readonly description: string;

  @ApiProperty({ example: 0, description: 'Project lead', required: false })
  readonly leadId: number;
}
