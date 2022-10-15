import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Issue } from './issue.entity';
import { TRequest } from '../types';
import { CreateIssueDto, GetIssueDto, SearchIssuesDto, UpdateIssueDto } from './dto';
import { IssueService } from './issue.service';
import { IssueGuard } from './issue.guard';
import { Roles } from '../project/project-roles.decorator';
import { ProjectRolesGuard } from '../project/project-roles.guard';

@ApiTags('Issues')
@Controller('issues')
export class IssueController {
  constructor(private issuesService: IssueService) {}

  @ApiOperation({ summary: 'Create issue' })
  @ApiResponse({ status: 200, type: Issue })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER')
  @Post('/create')
  create(@Body() dto: CreateIssueDto, @Req() req: TRequest) {
    return this.issuesService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Search issue' })
  @ApiResponse({ status: 200, type: [Issue] })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/search')
  search(@Body() body: SearchIssuesDto) {
    return this.issuesService.search(body);
  }

  @ApiOperation({ summary: 'Get issue' })
  @ApiResponse({ status: 200, type: Issue })
  @UseGuards(JwtAuthGuard, IssueGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/get')
  get(@Body() dto: GetIssueDto) {
    return this.issuesService.getById(dto);
  }

  @ApiOperation({ summary: 'Update issue' })
  @ApiResponse({ status: 200, type: Issue })
  @UseGuards(JwtAuthGuard, IssueGuard)
  @Roles('ADMIN', 'WORKER')
  @Post('/update')
  update(@Body() dto: UpdateIssueDto) {
    return this.issuesService.update(dto);
  }

  @ApiOperation({ summary: 'Remove issue' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, IssueGuard)
  @Roles('ADMIN')
  @Post('/remove')
  remove(@Body() dto: GetIssueDto) {
    return this.issuesService.remove(dto);
  }
}
