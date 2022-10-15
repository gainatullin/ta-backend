import { ApiProperty } from '@nestjs/swagger';

export class DeleteShortcutDto {
  @ApiProperty({ example: 0, description: 'Shortcut id' })
  readonly id: number;
}
