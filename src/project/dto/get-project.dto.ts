import { ApiProperty } from '@nestjs/swagger';

export class GetProjectDto {
  @ApiProperty({ example: 0, description: 'Project id', required: false })
  readonly id?: number;

  @ApiProperty({ example: 'string', description: 'Project ticket', required: false })
  readonly ticket?: string;
}
