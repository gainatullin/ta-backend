import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../project-user-role/project-user-role.entity';

export class CreateInvitationDto {
  @ApiProperty({ example: 'string', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 0, description: 'Workspace id' })
  readonly workspaceId: number;

  @ApiProperty({ example: 0, description: 'Project id' })
  readonly projectId: number;

  @ApiProperty({ example: 'string', enum: Roles, default: Roles.WORKER, description: 'User role', required: false })
  readonly role: Roles;
}
