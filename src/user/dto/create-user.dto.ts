import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'string', description: "User's name" })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'string', description: "User's email" })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'string', description: "User's password" })
  readonly passwordHash: string;
}
