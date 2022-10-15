import { PickType } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';

export class SearchDocumentDto extends PickType(CreateDocumentDto, ['projectId'] as const) {
}
