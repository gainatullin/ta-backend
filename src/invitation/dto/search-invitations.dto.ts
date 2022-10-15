import { ApiProperty } from '@nestjs/swagger';

export class SearchInvitationsDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly projectId: number;
}
