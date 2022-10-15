import { PickType } from '@nestjs/swagger';
import { CreateComponentDto } from './create-component.dto';

export class SearchComponentDto extends PickType(CreateComponentDto, ['projectId'] as const) {
}
