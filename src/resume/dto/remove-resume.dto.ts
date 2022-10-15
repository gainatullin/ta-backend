import { ApiProperty } from '@nestjs/swagger';

export class RemoveResumeDto {
  @ApiProperty({ example: 0, description: 'Resume id' })
  readonly id: number;
}
