import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Component } from './component.entity';
import { CreateComponentDto, DeleteComponentDto, SearchComponentDto, UpdateComponentDto } from './dto';
import { ComponentGuard } from './component.guard';
import { Roles } from '../project/project-roles.decorator';
import { ProjectRolesGuard } from '../project/project-roles.guard';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiTags('Components')
@Controller('components')
export class ComponentController {
  constructor(private componentService: ComponentService) {}

  @ApiOperation({ summary: 'Component create' })
  @ApiResponse({ status: 200, type: Component })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER')
  @Post('/create')
  create(@Body() dto: CreateComponentDto) {
    return this.componentService.create(dto);
  }

  @ApiOperation({ summary: 'Components search' })
  @ApiResponse({ status: 200, type: [Component] })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @UsePipes(new ValidationPipe())
  @Post('/search')
  search(@Body() dto: SearchComponentDto) {
    return this.componentService.search(dto);
  }

  @ApiOperation({ summary: 'Component remove' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ComponentGuard)
  @Roles('ADMIN')
  @Post('/remove')
  delete(@Body() dto: DeleteComponentDto) {
    return this.componentService.delete(dto);
  }

  @ApiOperation({ summary: 'Component update' })
  @ApiResponse({ status: 200, type: Component })
  @UseGuards(JwtAuthGuard, ComponentGuard)
  @Roles('ADMIN')
  @Post('/update')
  update(@Body() dto: UpdateComponentDto) {
    return this.componentService.update(dto);
  }
}
