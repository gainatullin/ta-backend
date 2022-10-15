import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty({ example: 0, description: 'Workspace id' })
  readonly id: number;
}
