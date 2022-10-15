import { ApiProperty } from '@nestjs/swagger';

export class SearchProjectUsersDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly id: number;
}
