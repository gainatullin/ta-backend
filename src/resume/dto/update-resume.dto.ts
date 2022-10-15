import { ApiProperty } from '@nestjs/swagger';

export class UpdateResumeDto {
  @ApiProperty({ example: 0, description: 'Resume id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'User name', required: false })
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
}
