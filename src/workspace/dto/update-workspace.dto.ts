import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateWorkspaceDto {
  @ApiProperty({ example: 0, description: 'Workspace id' })
  @IsNotEmpty({ message: 'cannot be empty' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Workspace id', required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Workspace id', required: false })
  readonly description: string;
}
