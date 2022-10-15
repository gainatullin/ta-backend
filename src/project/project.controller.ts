import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Project } from './project.entity';
import { TRequest } from '../types';
import { ProjectService } from './project.service';
import {
  AddUserToProjectDto,
  CreateProjectDto,
  GetProjectDto,
  SearchProjectsDto,
  UploadDto,
  UpdateProjectDto,
} from './dto';
import { SearchProjectUsersDto } from './dto/search-project-users.dto';
import { DeleteUserFromProjectDto } from './dto/delete-user-from-project.dto';
import { ProjectRolesGuard } from './project-roles.guard';
import { Roles } from './project-roles.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({ summary: 'Project create' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateProjectDto, @Req() req: TRequest) {
    return this.projectService.create({ ...dto, creatorId: req.user.id });
  }

  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Post('/get')
  getByID(@Body() dto: GetProjectDto, @Req() req) {
    return this.projectService.getByID(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Projects list' })
  @ApiResponse({ status: 200, type: [Project] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Body() dto: SearchProjectsDto, @Req() req: TRequest) {
    return this.projectService.search(req.user.id);
  }

  @ApiOperation({ summary: 'Remove project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN')
  @Post('/remove')
  remove(@Body() dto: GetProjectDto, @Req() req: TRequest) {
    return this.projectService.remove(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN')
  @Post('/update')
  update(@Body() dto: UpdateProjectDto, @Req() req: TRequest) {
    return this.projectService.update(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Add user to project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN')
  @Post('/users/add')
  addUsers(@Body() dto: AddUserToProjectDto) {
    return this.projectService.addUser(dto);
  }

  @ApiOperation({ summary: 'Remove user from project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN')
  @Post('/users/remove')
  removeUser(@Body() dto: DeleteUserFromProjectDto) {
    return this.projectService.removeUser(dto);
  }

  @ApiOperation({ summary: 'Update user role in project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN')
  @Post('/users/update')
  updateUser(@Body() dto: AddUserToProjectDto) {
    return this.projectService.updateUser(dto);
  }

  @ApiOperation({ summary: 'Search user from project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/users/search')
  searchUsers(@Body() dto: SearchProjectUsersDto) {
    return this.projectService.searchUsers(dto);
  }

  @ApiOperation({ summary: 'Update project avatar' })
  @ApiResponse({ status: 200 })
  @ApiQuery({ name: 'avatar', description: 'avatar' })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/upload')
  uploadAvatar(@UploadedFile() avatar, @Body() dto: UploadDto) {
    return this.projectService.upload(avatar, dto.id);
  }

  @ApiOperation({ summary: 'Download project avatar' })
  @ApiQuery({ name: 'id', description: 'id', example: '?id=1' })
  @Get('/download')
  download(@Query() query, @Res({ passthrough: true }) res) {
    return this.projectService.downloadAvatar(query.id, res);
  }
}
