import { ApiProperty } from '@nestjs/swagger';

export class SearchWorkspaceDto {
  @ApiProperty({ example: { limit: 0, offset: 0 }, description: 'Limitation', required: false })
  limitation: {
    readonly limit: number;
    readonly offset: number;
  };
}
