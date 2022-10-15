import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserFromProjectDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly id: number;

  @ApiProperty({ example: 0, description: 'User id' })
  readonly userId: number;
}
