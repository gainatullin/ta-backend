import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 0, description: 'Project id' })
  readonly projectId: number;

  @ApiProperty({ example: 'string', description: 'Document name' })
  readonly name: string;

  @ApiProperty({ example: 'string', description: 'Document content', required: false })
  readonly content: string;
}
