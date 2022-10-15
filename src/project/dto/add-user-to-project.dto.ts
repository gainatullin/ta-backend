import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../project-user-role/project-user-role.entity';

export class AddUserToProjectDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly id: number;

  @ApiProperty({ example: 0, description: 'User id' })
  readonly userId: number;

  @ApiProperty({ example: 'string', enum: Roles, default: Roles.WORKER, description: 'User role', required: false })
  readonly role: Roles;
}
