import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetWorkspaceDto {
  @ApiProperty({ example: 0, description: 'Workspace id' })
  @IsNotEmpty({ message: 'cannot be empty' })
  readonly id: number;
}
