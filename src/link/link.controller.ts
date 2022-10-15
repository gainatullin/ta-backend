import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Link } from './link.entity';
import { SearchLinkDto, RemoveLinkDto, UpdateLinkDto, CreateLinkDto } from './dto';

@ApiTags('Links')
@Controller('links')
export class LinkController {
  constructor(private issueLinkService: LinkService) {}

  @ApiOperation({ summary: 'Issue link create' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateLinkDto) {
    return this.issueLinkService.create(dto);
  }

  @ApiOperation({ summary: 'Issue links search' })
  @ApiResponse({ status: 200, type: [Link] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Body() dto: SearchLinkDto) {
    return this.issueLinkService.search(dto);
  }

  @ApiOperation({ summary: 'Issue link remove' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  remove(@Body() dto: RemoveLinkDto) {
    return this.issueLinkService.remove(dto);
  }

  @ApiOperation({ summary: 'Issue link update' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  update(@Body() dto: UpdateLinkDto) {
    return this.issueLinkService.update(dto);
  }
}
