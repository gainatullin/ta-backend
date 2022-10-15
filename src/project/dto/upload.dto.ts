import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly id: number;
}
