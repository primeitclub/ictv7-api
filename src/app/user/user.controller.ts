import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all-users')
  async handleGetAllUsers(@Req() req) {
    const users = await this.userService.getAllUsers();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of all users',
      users
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-profile')
  async handleMyProfile(@Req() req) {
    const user = req.user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User details fetched successfully.',
      user
    };
  }
}
