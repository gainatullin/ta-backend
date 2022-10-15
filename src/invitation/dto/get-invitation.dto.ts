import { ApiProperty } from '@nestjs/swagger';

export class GetInvitationDto {
  @ApiProperty({ example: 0, description: 'Invitation id' })
  readonly id: number;
}
