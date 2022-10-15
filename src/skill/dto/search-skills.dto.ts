import { ApiProperty } from '@nestjs/swagger';

export class SearchSkillsDto {
  @ApiProperty({ example: 'string', description: 'Skill name' })
  readonly value: string;
}
