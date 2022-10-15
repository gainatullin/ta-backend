import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Workspace } from './workspace.entity';
import { TRequest } from '../types';
import {
  CreateWorkspaceDto,
  GetWorkspaceDto,
  SearchWorkspaceDto,
  UploadDto,
  UpdateWorkspaceDto,
  SearchWorkspaceUsersDto,
} from './dto';
import { WorkspaceGuard } from './workspace.guard';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private workspacesService: WorkspaceService) {}

  @ApiOperation({ summary: 'Workspace create' })
  @ApiResponse({ status: 200, type: Workspace })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/create')
  create(@Body() dto: CreateWorkspaceDto, @Req() req: TRequest) {
    return this.workspacesService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Get workspace by id' })
  @ApiResponse({ status: 200, type: Workspace })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/get')
  getByID(@Body() dto: GetWorkspaceDto) {
    return this.workspacesService.getById(dto);
  }

  @ApiOperation({ summary: 'Remove workspace' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, WorkspaceGuard)
  @Post('/remove')
  remove(@Body() dto: GetWorkspaceDto) {
    return this.workspacesService.remove(dto);
  }

  @ApiOperation({ summary: "User's workspace list" })
  @ApiResponse({ status: 200, type: [Workspace] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Body() dto: SearchWorkspaceDto, @Req() req) {
    return this.workspacesService.search(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Update workspace' })
  @ApiResponse({ status: 200, type: Workspace })
  @UseGuards(JwtAuthGuard, WorkspaceGuard)
  @UsePipes(new ValidationPipe())
  @Post('/update')
  update(@Body() dto: UpdateWorkspaceDto) {
    return this.workspacesService.update(dto);
  }

  @ApiOperation({ summary: 'Search user from workspace' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/users/search')
  searchUsers(@Body() dto: SearchWorkspaceUsersDto) {
    return this.workspacesService.searchUsers(dto);
  }

  @ApiOperation({ summary: 'Update workspace avatar' })
  @ApiResponse({ status: 200 })
  @ApiQuery({ name: 'avatar', description: 'avatar' })
  @UseGuards(JwtAuthGuard, WorkspaceGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/upload')
  uploadAvatar(@UploadedFile() avatar, @Body() dto: UploadDto) {
    return this.workspacesService.updateWorkspaceAvatar(avatar, dto.id);
  }

  @ApiOperation({ summary: 'Download workspace avatar' })
  @ApiQuery({ name: 'id', description: 'id', example: '?id=1' })
  @Get('/download')
  download(@Query() query, @Res({ passthrough: true }) res) {
    return this.workspacesService.downloadAvatar(query.id, res);
  }
}
