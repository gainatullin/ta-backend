import { ApiProperty } from '@nestjs/swagger';

export class RemoveLinkDto {
  @ApiProperty({ example: 0, description: 'Issue link id' })
  readonly id: number;
}
