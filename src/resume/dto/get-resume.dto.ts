import { ApiProperty } from '@nestjs/swagger';

export class GetResumeDto {
  @ApiProperty({ example: 0, description: 'Resume id' })
  readonly creatorId: number;
}
