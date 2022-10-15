import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'string', description: "User's name", required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: "User's email", required: false })
  readonly email: string;

  @ApiProperty({ example: 'string', description: "User's password", required: false })
  readonly passwordHash: string;
}
