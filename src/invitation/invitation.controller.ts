import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Invitation } from './invitation.entity';
import { ConfirmInvitationDto, CreateInvitationDto, GetInvitationDto } from './dto';
import { SearchInvitationsDto } from './dto/search-invitations.dto';

@ApiTags('Invitations')
@Controller('invitations')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}

  @ApiOperation({ summary: 'Invitation create' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateInvitationDto, @Req() req) {
    return this.invitationService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Invitation confirm' })
  @ApiResponse({ status: 200 })
  @Post('/confirm')
  confirm(@Body() dto: ConfirmInvitationDto) {
    return this.invitationService.confirm(dto);
  }

  @ApiOperation({ summary: 'Get invitation by id' })
  @ApiResponse({ status: 200, type: Invitation })
  @Post('/get')
  get(@Body() dto: GetInvitationDto) {
    return this.invitationService.getById(dto);
  }

  @ApiOperation({ summary: 'Invitations search' })
  @ApiResponse({ status: 200, type: [Invitation] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  search(@Body() dto: SearchInvitationsDto) {
    return this.invitationService.search(dto);
  }
}
