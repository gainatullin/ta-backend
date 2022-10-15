import { ApiProperty } from '@nestjs/swagger';

export class SearchUsersDto {
  @ApiProperty({ example: 'string', description: 'name', required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'email', required: false })
  readonly email: string;

  @ApiProperty({ example: { limit: 0, offset: 0 }, description: 'Limitation', required: false })
  limitation: {
    readonly limit: number;
    readonly offset: number;
  };
}
