import { ApiProperty } from '@nestjs/swagger';

export class SearchProjectsDto {
  @ApiProperty({ example: 0, description: 'User id', required: false })
  readonly userId: number;

  @ApiProperty({ example: 0, description: 'Workspace id', required: false })
  workspaceId: number;

  @ApiProperty({ example: { limit: 0, offset: 0 }, description: 'Limitation', required: false })
  readonly limitation: {
    readonly limit: number;
    readonly offset: number;
  };
}
