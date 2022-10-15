import { PickType } from '@nestjs/swagger';
import { CreateSprintDto } from './create-sprint.dto';

export class SearchSprintsDto extends PickType(CreateSprintDto, ['projectId'] as const) {}
