import { ApiProperty } from '@nestjs/swagger';

export class CreateShortcutDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly projectId: number;

  @ApiProperty({ example: 'string', description: 'Shortcut name' })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Shortcut link' })
  readonly link: string;
}
