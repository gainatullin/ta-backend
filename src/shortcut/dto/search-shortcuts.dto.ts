import { ApiProperty } from '@nestjs/swagger';

export class SearchShortcutsDto {
  @ApiProperty({ example: 0, description: 'Project id', required: false })
  readonly projectId: number;
}
