import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocumentDto {
  @ApiProperty({ example: 0, description: 'Document id' })
  readonly id: number;

  @ApiProperty({ example: 'string', description: 'Document name', required: false })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Document content', required: false })
  readonly content: string;
}
