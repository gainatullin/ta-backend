import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ example: 0, description: "User's id" })
  @IsNotEmpty({ message: 'Cannot be empty' })
  readonly id: number;
}
