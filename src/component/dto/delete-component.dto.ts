import { ApiProperty } from '@nestjs/swagger';

export class DeleteComponentDto {
  @ApiProperty({ example: 0, description: 'Component id' })
  readonly id: number;
}
