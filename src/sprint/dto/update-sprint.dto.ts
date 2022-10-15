import { ApiProperty } from '@nestjs/swagger';

export class UpdateSprintDto {
  @ApiProperty({ example: 0, description: 'Sprint id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Sprint name', required: false })
  readonly name: string;

  @ApiProperty({ example: Date(), description: 'Sprint end date' })
  readonly endDate: Date;
}
