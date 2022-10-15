import { ApiProperty } from '@nestjs/swagger';
import { Skill } from '../../skill/skill.entity';

export class CreateResumeDto {
  @ApiProperty({ example: 'string', description: 'User name' })
  readonly name: string;

  @ApiProperty({ example: '2022-02-27', description: 'birthDate', required: false })
  readonly birthDate: Date;

  @ApiProperty({ example: 'string', description: 'Country', required: false })
  readonly country: string;

  @ApiProperty({ example: 'string', description: 'City', required: false })
  readonly city: string;

  @ApiProperty({ example: 'string', description: 'Education', required: false })
  readonly education: string;

  @ApiProperty({ example: 'string', description: 'Experience', required: false })
  readonly experience: string;

  @ApiProperty({ example: ['string'], description: 'Experience', required: false })
  readonly skills: Skill[];
}
