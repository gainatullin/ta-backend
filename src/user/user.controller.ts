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
import { ApiQuery, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TRequest } from '../types';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, GetUserDto, SearchUsersDto, UpdateUserDto } from './dto';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ summary: 'User create' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(new ValidationPipe())
  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(new ValidationPipe())
  @Post('/get')
  getByID(@Body() dto: GetUserDto) {
    return this.usersService.getByID(dto.id);
  }

  @ApiOperation({ summary: 'Users list' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  getAll(@Body() body: SearchUsersDto) {
    return this.usersService.getAll(body);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  updateUser(@Body() body: UpdateUserDto, @Req() req: TRequest) {
    const userId = req.user.id;
    return this.usersService.updateUser(body, userId);
  }

  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({ status: 200 })
  @ApiQuery({ name: 'avatar', description: 'avatar' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/upload')
  uploadAvatar(@UploadedFile() avatar, @Req() req: TRequest) {
    return this.usersService.uploadAvatar(avatar, req.user.id);
  }

  @ApiOperation({ summary: 'Download user avatar' })
  @ApiQuery({ name: 'id', description: 'id', example: '?id=1' })
  @Get('/download')
  download(@Query() query, @Res({ passthrough: true }) res) {
    return this.usersService.downloadAvatar(query?.id, res);
  }
}
