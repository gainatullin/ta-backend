import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateComponentDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  @IsNotEmpty({ message: 'Cannot be empty' })
  readonly projectId: number;

  @ApiProperty({ example: 'string', description: 'Component name' })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Component description', required: false })
  readonly description: string;

  @ApiProperty({ example: 0, description: 'Component lead', required: false })
  readonly leadId: number;
}
