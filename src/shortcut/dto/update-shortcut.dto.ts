import { ApiProperty } from '@nestjs/swagger';

export class UpdateShortcutDto {
  @ApiProperty({ example: 0, description: 'Shortcut id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Shortcut name', required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Shortcut link', required: false })
  readonly link: string;
}
