import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: typeof String(), description: "User's email" })
  readonly email: string;

  @ApiProperty({ example: typeof String(), description: "User's password" })
  readonly passwordHash: string;
}
