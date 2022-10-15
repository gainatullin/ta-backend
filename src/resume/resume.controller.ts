import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResumeService } from './resume.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Resume } from './resume.entity';
import { TRequest } from '../types';
import { CreateResumeDto, GetResumeDto, RemoveResumeDto } from './dto';

@ApiTags('Resume')
@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @ApiOperation({ summary: 'Resume create' })
  @ApiResponse({ status: 200, type: Resume })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateResumeDto, @Req() req: TRequest) {
    return this.resumeService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Get resume' })
  @ApiResponse({ status: 200, type: Resume })
  @UseGuards(JwtAuthGuard)
  @Post('/get')
  getResume(@Body() dto: GetResumeDto) {
    return this.resumeService.get(dto);
  }

  @ApiOperation({ summary: 'Remove resume' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  removeResume(@Body() dto: RemoveResumeDto, @Req() req: TRequest) {
    return this.resumeService.remove(dto, req.user.id);
  }
}
