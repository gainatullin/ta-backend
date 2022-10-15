import { ApiProperty } from '@nestjs/swagger';

export class CreateSprintDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly projectId: number;

  @ApiProperty({ example: 'string', description: 'Sprint name' })
  readonly name: string;

  @ApiProperty({ example: Date(), description: 'Sprint start date' })
  readonly startDate: Date;

  @ApiProperty({ example: Date(), description: 'Sprint end date' })
  readonly endDate: Date;
}
