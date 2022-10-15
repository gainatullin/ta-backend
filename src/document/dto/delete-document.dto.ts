import { ApiProperty } from '@nestjs/swagger';

export class DeleteDocumentDto {
  @ApiProperty({ example: 0, description: 'Document id' })
  readonly id: number;
}
