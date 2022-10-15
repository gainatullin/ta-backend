import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TRequest } from '../types';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @ApiOperation({ summary: "Starts new user's session" })
  @ApiResponse({ status: 200, type: User })
  @Post('/signIn')
  signIn(@Body() body: SignInDto) {
    return this.authenticationService.signIn(body);
  }

  @ApiOperation({ summary: "Ends user's session" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/signOut')
  signOut() {
    return this.authenticationService.signOut();
  }

  @ApiOperation({ summary: '/authentication/getSelf' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('/getSelf')
  getSelf(@Req() req: TRequest) {
    return this.authenticationService.getSelf(req.user);
  }
}
