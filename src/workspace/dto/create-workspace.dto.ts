import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'string', description: 'Workspace name' })
  @IsNotEmpty({ message: 'cannot be empty' })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Workspace description', required: false })
  readonly description: string;
}
