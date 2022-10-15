import { ApiProperty } from '@nestjs/swagger';

export class SearchLinkDto {
  @ApiProperty({ example: 0, description: 'Source issue id' })
  readonly issueId: number;
}
