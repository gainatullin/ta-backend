import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { SkillService } from './skill.service';
import { SearchSkillsDto } from './dto/search-skills.dto';
import { Skill } from './skill.entity';

@ApiTags('Skills')
@Controller('skills')
export class SkillController {
  constructor(private skillsService: SkillService) {}

  create(@Body() dto: { value: string }) {
    return this.skillsService.create(dto.value);
  }

  @ApiOperation({ summary: 'Search skills' })
  @ApiResponse({ status: 200, type: [Skill] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Body() dto: SearchSkillsDto) {
    return this.skillsService.search(dto);
  }
}
