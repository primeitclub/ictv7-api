import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all-users')
  async handleGetAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of all users',
      users
    };
  }
}
