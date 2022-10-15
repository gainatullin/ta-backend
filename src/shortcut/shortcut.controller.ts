import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShortcutService } from './shortcut.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Shortcut } from './shortcut.entity';
import { CreateShortcutDto, DeleteShortcutDto, UpdateShortcutDto } from './dto';
import { SearchShortcutsDto } from './dto/search-shortcuts.dto';
import { ProjectRolesGuard } from '../project/project-roles.guard';
import { Roles } from '../project/project-roles.decorator';
import { ShortcutGuard } from './shortcut.guard';

@ApiTags('Shortcuts')
@Controller('shortcuts')
export class ShortcutController {
  constructor(private shortcutService: ShortcutService) {}

  @ApiOperation({ summary: 'Shortcut create' })
  @ApiResponse({ status: 200, type: Shortcut })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/create')
  create(@Body() dto: CreateShortcutDto) {
    return this.shortcutService.create(dto);
  }

  @ApiOperation({ summary: 'Shortcut update' })
  @ApiResponse({ status: 200, type: Shortcut })
  @UseGuards(JwtAuthGuard, ShortcutGuard)
  @Roles('ADMIN')
  @Post('/update')
  update(@Body() dto: UpdateShortcutDto) {
    return this.shortcutService.update(dto);
  }

  @ApiOperation({ summary: 'Shortcut delete' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, ShortcutGuard)
  @Roles('ADMIN')
  @Post('/remove')
  remove(@Body() dto: DeleteShortcutDto) {
    return this.shortcutService.remove(dto);
  }

  @ApiOperation({ summary: 'Shortcuts search' })
  @ApiResponse({ status: 200, type: [Shortcut] })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/search')
  search(@Body() dto: SearchShortcutsDto) {
    return this.shortcutService.search(dto);
  }
}
