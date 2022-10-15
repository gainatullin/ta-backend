import { ApiProperty } from '@nestjs/swagger';
import { ELink } from '../link.entity';

export class CreateLinkDto {
  @ApiProperty({ example: 0, description: 'Source issue id' })
  readonly sourceIssueId: number;

  @ApiProperty({ example: 0, description: 'Target issue id' })
  readonly targetIssueId: number;

  @ApiProperty({
    example: 'string',
    description: 'Issue link type',
    enum: ELink,
    default: ELink.isBLockedBy,
    required: false,
  })
  readonly linkType: ELink;
}
