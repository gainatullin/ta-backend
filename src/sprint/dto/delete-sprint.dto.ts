import { ApiProperty } from '@nestjs/swagger';

export class DeleteSprintDto {
  @ApiProperty({ example: 0, description: 'Sprint id' })
  readonly id: number;
}
