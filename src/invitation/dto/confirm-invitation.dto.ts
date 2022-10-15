import { ApiProperty } from '@nestjs/swagger';

export class ConfirmInvitationDto {
  @ApiProperty({ example: 0, description: 'Invitation id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Confirmation code' })
  readonly confirmationCode: string;

  @ApiProperty({ example: 'string', description: 'Password' })
  readonly passwordHash: string;
}
