import { ApiProperty } from '@nestjs/swagger';
import { ELink } from '../link.entity';

export class UpdateLinkDto {
  @ApiProperty({ example: 0, description: 'Issue link id' })
  readonly id: number;

  @ApiProperty({ example: 0, description: 'Target issue id', required: false })
  readonly targetIssueId: number;

  @ApiProperty({
    example: 'string',
    description: 'Issue link type',
    enum: ELink,
    required: false,
  })
  readonly linkType: ELink;
}
