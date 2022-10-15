import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Sprint } from './sprint.entity';
import { CreateSprintDto, DeleteSprintDto, SearchSprintsDto, UpdateSprintDto } from './dto';

@ApiTags('Sprints')
@Controller('sprints')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @ApiOperation({ summary: 'Sprint create' })
  @ApiResponse({ status: 200, type: Sprint })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateSprintDto) {
    return this.sprintService.create(dto);
  }

  @ApiOperation({ summary: 'Sprint search' })
  @ApiResponse({ status: 200, type: [Sprint] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Body() dto: SearchSprintsDto) {
    return this.sprintService.search(dto);
  }

  @ApiOperation({ summary: 'Sprint update' })
  @ApiResponse({ status: 200, type: Sprint })
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  update(@Body() dto: UpdateSprintDto) {
    return this.sprintService.update(dto);
  }

  @ApiOperation({ summary: 'Sprint delete' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  delete(@Body() dto: DeleteSprintDto) {
    return this.sprintService.delete(dto);
  }
}
