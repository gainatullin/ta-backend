import { ApiProperty } from '@nestjs/swagger';

export class UpdateComponentDto {
  @ApiProperty({ example: 0, description: 'Component id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Component name', required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Component description', required: false })
  readonly description: string;

  @ApiProperty({ example: 0, description: 'Component lead', required: false })
  readonly leadId: number;
}
