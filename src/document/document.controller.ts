import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Document } from './document.entity';
import { CreateDocumentDto, DeleteDocumentDto, SearchDocumentDto, UpdateDocumentDto } from './dto';
import { DocumentGuard } from './document.guard';
import { Roles } from '../project/project-roles.decorator';
import { ProjectRolesGuard } from '../project/project-roles.guard';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @ApiOperation({ summary: 'Document create' })
  @ApiResponse({ status: 200, type: Document })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/create')
  create(@Body() dto: CreateDocumentDto, @Req() req) {
    return this.documentService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Document update' })
  @ApiResponse({ status: 200, type: Document })
  @UseGuards(JwtAuthGuard, DocumentGuard)
  @Roles('ADMIN')
  @Post('/update')
  update(@Body() dto: UpdateDocumentDto) {
    return this.documentService.update(dto);
  }

  @ApiOperation({ summary: 'Documents search' })
  @ApiResponse({ status: 200, type: [Document] })
  @UseGuards(JwtAuthGuard, ProjectRolesGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/search')
  search(@Body() dto: SearchDocumentDto) {
    return this.documentService.search(dto);
  }

  @ApiOperation({ summary: 'Document get by id' })
  @ApiResponse({ status: 200, type: Document })
  @UseGuards(JwtAuthGuard, DocumentGuard)
  @Roles('ADMIN', 'WORKER', 'VIEWER')
  @Post('/get')
  get(@Body() dto: DeleteDocumentDto) {
    return this.documentService.getById(dto.id);
  }

  @ApiOperation({ summary: 'Document delete' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, DocumentGuard)
  @Roles('ADMIN')
  @Post('/remove')
  remove(@Body() dto: DeleteDocumentDto) {
    return this.documentService.remove(dto);
  }
}
